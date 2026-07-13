import { db } from '@/core/database/database';
import { publishLocalDataChange } from '@/core/database/events';
import type { ReviewInput, ReviewRecord, ReviewResult } from '@/reviews/types';

const day = (date: Date, days: number) => { const next=new Date(date); next.setDate(next.getDate()+days); return next.toISOString().slice(0,10); };
export function suggestNextReviewDate(sequence:number,result:ReviewResult, from=new Date()): string | undefined { if(result==='mastered')return day(from,60); if(result==='forgot')return day(from,1); const intervals=[1,7,15,30,60]; const base=intervals[Math.min(sequence,intervals.length-1)]!; return day(from,result==='partial'?Math.max(1,Math.floor(base/2)):base); }
export const ReviewService={
  getAll:async()=>((await db.reviews.toArray()) as ReviewRecord[]).filter((item)=>!item.deletedAt).sort((a,b)=>a.scheduledAt.localeCompare(b.scheduledAt)),
  create:async(input:ReviewInput)=>{if(!input.disciplineName.trim()||!input.subject.trim()||input.estimatedMinutes<=0)throw new Error('Informe disciplina, assunto e duracao valida.');const pending=((await db.reviews.toArray()) as ReviewRecord[]).find((item)=>item.sourceId===input.sourceId&&item.scheduledAt===input.scheduledAt&&item.status==='pending');if(pending)throw new Error('Ja existe uma revisao pendente para esta origem nesta data.');const now=new Date().toISOString();const review:ReviewRecord={...input,id:globalThis.crypto?.randomUUID?.()??`review-${Date.now()}`,status:'pending',reviewSequence:0,createdAt:now,updatedAt:now};await db.reviews.put(review);publishLocalDataChange();return review;},
  update:async(review:ReviewRecord)=>{const updated={...review,updatedAt:new Date().toISOString()};await db.reviews.put(updated);publishLocalDataChange();return updated;},
  start:async(review:ReviewRecord)=>ReviewService.update({...review,status:'inProgress'}),
  reschedule:async(review:ReviewRecord,scheduledAt:string)=>ReviewService.update({...review,scheduledAt,status:'pending'}),
  cancel:async(review:ReviewRecord)=>ReviewService.update({...review,status:'cancelled'}),
  complete:async(review:ReviewRecord,result:ReviewResult)=>{const completedAt=new Date().toISOString();const completed=await ReviewService.update({...review,status:'completed',result,completedAt,reviewSequence:review.reviewSequence+1});if(review.sourceType==='error'&&review.sourceId){const error=await db.errorRecords.get(review.sourceId) as { id:string;createdAt:string;lastReviewedAt?:string;reviewResult?:string;updatedAt?:string;history?:string[] }|undefined;if(error){await db.errorRecords.put({...error,lastReviewedAt:completedAt,reviewResult:result,updatedAt:completedAt,history:[...(error.history??[]),'Revisao concluida.']} as never);}}return completed;},
};

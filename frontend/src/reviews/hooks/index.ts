import { useEffect, useState } from 'react';
import { ReviewService } from '@/reviews/services';
import type { ReviewRecord } from '@/reviews/types';
export function useReviews(){const [reviews,setReviews]=useState<ReviewRecord[]>([]);const [status,setStatus]=useState<'loading'|'success'|'error'>('loading');const reload=()=>void ReviewService.getAll().then((items)=>{setReviews(items);setStatus('success');}).catch(()=>setStatus('error'));useEffect(reload,[]);return{reviews,status,reload};}

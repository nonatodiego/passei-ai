import { useEffect, useState } from 'react';
import { useLocalData } from '@/core/providers/useLocalData';
import { TodayService } from '@/today/services';
import type { TodayData, TodayStatus } from '@/today/types';
export function useToday(){const [data,setData]=useState<TodayData>();const [status,setStatus]=useState<TodayStatus>('loading');const {revision}=useLocalData();useEffect(()=>{void TodayService.getToday().then((value)=>{setData(value);setStatus(value.activities.length?'success':'empty');}).catch(()=>setStatus('error'));},[revision]);return{data:data!,status};}

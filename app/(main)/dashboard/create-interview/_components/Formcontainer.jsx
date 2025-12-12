import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function Formcontainer({onHandleInputChange, GoToNext}) {

  const [interviewTpye,setInterviewTpye]=useState([]);

  useEffect(()=>{
    if(interviewTpye)
    {
      onHandleInputChange('type',interviewTpye)
    }
  },[interviewTpye])

  const AddInterviewType=(type)=>{
      const data=interviewTpye.includes(type);
      if(!data){
        setInterviewTpye(prev=>[...prev, type])
      }
      else{
        const result=interviewTpye.filter(item=>item!=type);
        setInterviewTpye(result);
      }
  }

  return (
    <div className='p-5 bg-white rounded-2xl'>
        <div>
            <h2 className='text-sm font-medium'>Job Positon</h2>
            <Input placeholder="e.g. Full Stack Developer" 
            className='mt-2 border border-black'
            onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}
             />
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Job Description</h2>
            <Textarea placeholder="Enter details job description.." className='mt-2 h-[120px] border border-black'
             onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}
              />
        </div>
        <div className='mt-5 '>
            <h2 className='text-sm font-medium'>Interview Duration</h2>
            <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
  <SelectTrigger className="mt-2 w-[180px] border border-black">
    <SelectValue placeholder="Select Duration" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="5">5 Min</SelectItem>
    <SelectItem value="15">15 Min</SelectItem>
    <SelectItem value="30">30 Min</SelectItem>
    <SelectItem value="45">45 Min</SelectItem>
    <SelectItem value="60">60 Min</SelectItem>
  </SelectContent>
</Select>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
            {InterviewType.map((type,index)=>(
              <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 bg-white border
              hover:bg-violet-200 border-black rounded-2xl ${interviewTpye.includes(type.title)&&'bg-violet-400 text-primary'}`}
              onClick={()=>AddInterviewType(type.title)}
              >
                  <type.icon className='h-4 w-4'/>
                  <span>{type.title}</span>
              </div>
            ))}
            </div>
        </div>

        <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
          <Button>Generate Question <ArrowRight /></Button>
        </div>
    </div>
  )
}

export default Formcontainer
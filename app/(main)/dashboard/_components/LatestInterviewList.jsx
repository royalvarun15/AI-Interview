"use client"
import { Button } from '@/components/ui/button';
import { Camera, Video } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

function LatestInterviewList() {
    const [interviewList,setInterviewList]=useState([]);
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>Previosly Created Interviews</h2>

        {interviewList?.length==0&&
        <Link href={'/dashboard/create-interview'} className='p-5 flex flex-col gap-3 items-center mt-5 cursor-pointer'>
                <Video className='h-10 w-10 text-primary'/>
                <h2>You don't have any interview created!</h2>
                <Button>Create New Interview</Button>
        </Link>}
    </div>
  )
}

export default LatestInterviewList
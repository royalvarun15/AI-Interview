import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, MessageCircle, MessageCircleCode, Plus, Share, Slack, Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewLink({interview_id, formData}) {
  const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id

  const GetInterviewUrl=()=>{
    return url;
  }
  const onCopyLink=async()=>{
    await navigator.clipboard.writeText(url);
    toast('Link Copied')
  }

  return (
    <div className='flex flex-col items-center justify-center mt-12'>
      <Image src={'/checkbox.png'} alt='check'
      width={200}
      height={200}
      className='w-[100px] h-[50px]'
      />
      <h2 className='font-bold text-lg mt-4'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link with your candidates to start the interview process..</p>
      <div className='w-full p-7 mt-6 rounded-lg bg-white'>
        <div className='flex justify-between items-center'>
          <h2 className='font-bold'>Interview Link</h2>
          <h2 className='p-1 px-2 text-primary bg-violet-200 rounded-4xl'>valid for 30 Days</h2>
        </div>
        <div className='mt-3 border rounded-xl flex gap-3 items-center'>
            <Input defaultValue={GetInterviewUrl()} disabled={true} />
            <Button onClick={()=>onCopyLink()} > <Copy /> Copy Link </Button>
          </div>
          <hr className='my-7'/>

          <div className='flex gap-5'>
            <h2 className='text-sm text-gray-500 flex gap-2 items-center'><Clock className='h-4 w-4' />{formData?.duration}</h2>
            <h2 className='text-sm text-gray-500 flex gap-2 items-center'><List className='h-4 w-4' />10 Questions</h2>
          </div>
      </div>

      <div className='mt-7 bg-white p-5 rounded-lg w-full'>
        <h2 className='font-bold'>Share Via</h2>
        <div className='flex gap-7 mt-2 justify-around'>
          <Button variant={'outline'} className=''><Mail />Email</Button>
          <Button variant={'outline'} className=''><Slack />Slack</Button>
          <Button variant={'outline'} className=''><MessageCircle/>Whatsapp</Button>
          </div>

      </div>
      <div className='flex mt-6 gap-5 justify-between w-full'>
        <Link href={'/dashboard'}>
      <Button variant={'outline'}><ArrowLeft />Back to Dashboard</Button>
      </Link>
      <Link href={'/create-interview'}>
      <Button><Plus />Create New Interview</Button>
      </Link>
      </div>
      </div>
  )
}

export default InterviewLink
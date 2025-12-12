import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
        <Image src={'/HireMind.png'} alt='logo' width={200} height={100} className='w-[145px]' />
    </div>
  )
}

export default InterviewHeader
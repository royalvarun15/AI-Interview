"use client"
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
  return (
    <div>
      <div className='bg-white p-3 rounded-2xl'>
        <h2 className=' text-lg font-bold'>Welcome</h2>
        <h2 className='text-gray-500'>AI-Driver Interviews, Hassel-Free Hiring</h2>
      </div>
    </div>
  )
}

export default WelcomeContainer
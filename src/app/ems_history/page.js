import React from 'react'
import Navbar from '@/components/navbar_ems'

export default function () {
  return (
    <div className='w-screen h-[calc(100vh-83px)] mt-[83px] bg-gray-200 flex items-center justify-center'>
        <Navbar />
        <h1 className='text-[2rem] text-gray-400'>Patient history will be displayed here.</h1>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/navbar_ems'

export default function 
() {
  return (
    <div className='w-screen h-[calc(100vh-83px)] mt-[83px] bg-gray-200 flex flex-col items-center justify-center'>
        <Navbar />
        <button className=' aspect-square shadow-2xl shadow-red-800/50 rounded-full mt-5 bg-radial hover:bg-radial from-red-700 hover:from-red-700 from-40% hover:from-30% to-red-500 hover:to-red-400 '>
            <Link href='/find_hospital' />
            <div className='text-white text-[3em] text-lg font-bold p-8'>New Case</div>
        </button>
        
    </div>
  )
}

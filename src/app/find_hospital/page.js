import React from 'react'
import Image from 'next/image'

export default function () {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <div className='absolute w-full aspect-square rounded-full bg-transparent animate-[pulsefade_3s_ease-out_infinite] border-4 border-red-500'></div>
        <Image src='/ems.png' width={1080} height={1080} alt='hospital car' className='w-[20%] z-10'/>
        <div className='text-[1.2em] text-red-700'>Finding the nearest hospital...</div>
    </div>
  )
}

'use client'
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  useEffect(()=>{
    router.push('/dashboard/partners')
  },[])
  return (
    <div className='flex flex-1 h-screen justify-center items-center'>
        <Loader className='animate-spin'/>
    </div>
  )
}

export default Page
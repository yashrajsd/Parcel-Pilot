import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='flex justify-center items-center h-screen flex-1 font-aeronik'>
      <Link href={'/dashboard/partners'}>
      <button className='p-2 rounded-md border-[1px]'>Go to dashboard</button>
      </Link>
    </div>
  )
}

export default Page
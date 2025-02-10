import Image from 'next/image'
import React from 'react'
import deliveryGuy from '../../../../../public/asset/images/deliveryguy.png'


const ActivePartners = () => {
  return (
    <div className='w-full flex flex-col items-center bg-[#2957FF] relative p-5 h-60 rounded-md justify-center overflow-hidden'>
        <h1 className='text-left w-full'><span className='font-bold text-[3rem]'>{40}</span>/50 active delivery guys</h1>
        <div className='absolute bottom-0 right-0'>
        <Image
            src={deliveryGuy}
            alt='Delivery guy png'
            className='w-auto h-[15rem] animate-bounce relative top-[5rem]'
        />
        </div>
    </div>
  )
}

export default ActivePartners
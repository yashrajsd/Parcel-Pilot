import React from 'react'

interface AvgRatingProps{
  averageRating:number
}

const AvgRating:React.FC<AvgRatingProps> = ({averageRating}) => {
  return (
    <div className='lg:w-[45%]'>
        <h1 className='text-center text-[#131313]'><span className='text-[2rem] text-[#4278FF]'>{averageRating}</span>/5</h1>
        <p className='text-center text-[#3F4369]'>Average Rating</p>
    </div>
  )
}

export default AvgRating
import React from 'react'
import AvgRating from './avg-rating'
import ProfileCount from './profile-count'

interface ProfileStatsProps{
  averageRating:number,
  totalProfilesCount:number
}

const ProfileStats:React.FC<ProfileStatsProps> = ({averageRating,totalProfilesCount}) => {
  return (
    <div className='p-4'>
        <div className='rounded-lg bg-[#FCFCFC] flex py-6 justify-between items-center'>
            <AvgRating averageRating={averageRating}/>
            <div className='h-[4rem] opacity-[0.3] border-[1px] border-[#CDCDCD]'/>
            <ProfileCount totalProfilesCount={totalProfilesCount}/>
        </div>
    </div>
  )
}

export default ProfileStats

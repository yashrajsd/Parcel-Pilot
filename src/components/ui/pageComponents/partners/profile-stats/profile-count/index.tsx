import React from 'react'

interface ProfileCountProps{
    totalProfilesCount:number
}

const ProfileCount:React.FC<ProfileCountProps> = ({totalProfilesCount}) => {
    return (
        <div className='lg:w-[45%]'>
            <h1 className='text-center text-[#131313]'><span className='text-[2rem] text-[#4278FF]'>{totalProfilesCount}</span></h1>
            <p className='text-center text-[#3F4369]'>Total Profiles</p>
        </div>
    )
}

export default ProfileCount
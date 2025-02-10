'use client'
import PopupForm from '@/components/ui/pageComponents/partners/popup-form'
import ProfileStats from '@/components/ui/pageComponents/partners/profile-stats'
import ProfileTable from '@/components/ui/pageComponents/partners/profile-table'
import { Profile, ProfilesResponse } from '@/constants/profileData'
import { Ban, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'




function Page() {
  const [data, setData] = useState<ProfilesResponse | null>(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [profile,setProfile] = useState<Profile | null>(null);

  const fetchData=async()=>{
    const response = await fetch('/api/partners',{
      method:'GET',
      headers: {
        "Content-type": "application/json"
      }
    })
    if(response.ok){
      const Data = await response.json();
      setData(Data);
    }else{
      setError("Error fetching Data | Try Reloading");
    }
    setLoading(false);
  }


  useEffect(()=>{
    setLoading(true);
    fetchData();
  },[])


  if(error){
    return(
      <div className='items-center flex justify-center h-screen flex-1 flex-col gap-2'>
        <Ban className='text-[#FF334E]' size={60}/>
        <h1 className='text-[#131313] '>{error}</h1>
      </div>
    )
  }

  return (
    <div className={`w-full relative ${loading && 'animate-pulse'}`}>
        <ProfileStats averageRating={data?.averageRating || 0} totalProfilesCount={data?.totalProfilesCount || 0}/>
        <ProfileTable profiles={data?.profiles || []} setProfile={setProfile} />
        {loading && (<div className='w-full  flex items-center text-[#131313] mt-5 justify-center'><Loader className='animate-spin'/></div>)}
        {profile && <PopupForm profile={profile} setProfile={setProfile}/>}
    </div>
  )
}

export default Page
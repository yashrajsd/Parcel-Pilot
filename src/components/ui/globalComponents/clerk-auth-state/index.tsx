import React from 'react'
import{
    ClerkLoading,
    SignedOut,
    SignInButton,
    UserButton
} from '@clerk/nextjs'
import {User} from 'lucide-react'
import Loader from '../loader'


const ClerkAuthState = () => {
  return (
    <>
    <ClerkLoading>
        <Loader state>
            <></>
        </Loader>
    </ClerkLoading>
    <SignedOut>
        <SignInButton>
            <button className='rounded-xl 
            bg-[#252525]
            text-white
            hover:bg-[#252525]/70
            '>
                <User/>
                Login
            </button>
        </SignInButton>
    </SignedOut>
    <SignInButton>
        <UserButton>
            <UserButton.UserProfileLink label='Dashboard' url='/dashboard' labelIcon={<User size={16}/>}/>
        </UserButton>
    </SignInButton>
    </>
  )
}

export default ClerkAuthState
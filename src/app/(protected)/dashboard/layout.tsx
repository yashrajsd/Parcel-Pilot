import Sidebar from '@/components/ui/globalComponents/sidebar'
import TopBar from '@/components/ui/globalComponents/topbar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='lg:flex w-full font-aeonik'>
        <TopBar/>
        <Sidebar />
        <div className='lg:ml-[18%] w-[100%] lg:w-[82%] min-h-screen lg:p-4'> 
            {children}
        </div>
    </div>
  )
}

export default Layout

'use client'
import Image from 'next/image';
import React, { useState } from 'react';
import Logo from '../../../../../public/asset/images/logo.png';
import SIDE_BTNS from '@/constants/sidebar';
import Link from 'next/link';
import ClerkAuthState from '../clerk-auth-state';

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);


  const handleToggleSubMenu = (url: string) => {
    setOpenSubMenu(prev => (prev === url ? null : url)); 
  };

  return (
    <div className="fixed hidden lg:block top-0 left-0 h-screen bg-[#F8FAFB] w-[18%] px-[1rem] py-[1rem]">
      <div className="flex items-center gap-[0.7rem]">
        <Image
          src={Logo}
          alt="ParcelPilot logo"
          height={38}
          className="rounded-md"
        />
        <span>
          <h1 className="text-[#171717] m-0 font-medium">Parcel Pilot</h1>
          <p className="m-0 text-[#171717] opacity-[0.6] text-[0.8rem]">
            Delivering Happiness
          </p>
        </span>
      </div>

      <div className="py-[1rem]">
        <h1 className="text-[#171717] font-bold mb-2">Dashboard</h1>
        <ul className="flex flex-col gap-2">
          {SIDE_BTNS.map((item, index) => (
            <div key={index}>
              <Link href={`/dashboard${item.url}`}>
                <li
                  className={`flex pl-2 py-1 items-center gap-2 text-[#171717] cursor-pointer hover:bg-[#3554FF] hover:text-white transition duration-300 rounded-md ${openSubMenu === item.url && 'bg-[#3554FF] text-white'}`}
                  onClick={() => handleToggleSubMenu(item.url)} 
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </li>
              </Link>

              {item.subBtn && openSubMenu === item.url && (
                <ul className="flex flex-col gap-1">
                  {item.subBtn.map((btn, idx) => (
                    <Link href={`/dashboard${item.url}${btn.url}`} key={idx}>
                    <li
                      className="flex pl-6 py-1 items-center gap-2 text-[#606060] cursor-pointer hover:bg-[#E9E9E9] transition duration-300 rounded-md"
                    >
                      <btn.icon className="w-4 h-4" />
                      {btn.label}
                    </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
      <hr/>
      <div className='flex gap-4 items-center mt-6 border-[1px] px-2 py-2 rounded-lg'>
        <ClerkAuthState/>
        <h1 className='text-[#131313] text-[0.8rem]'>Profile</h1>
      </div>
    </div>
  );
};

export default Sidebar;

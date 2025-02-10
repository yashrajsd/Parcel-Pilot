'use client'
import type React from 'react';
import { useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../../../public/asset/images/logo.jpg';
import SIDE_BTNS from '@/constants/sidebar';
import ClerkAuthState from '../clerk-auth-state';

const TopBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full relative bg-white lg:hidden border-b-[1px] px-4 py-2 flex items-center justify-between z-[9999]">
      <div className="flex items-center gap-2">
        <Image src={Logo || '/placeholder.svg'} alt="ParcelPilot logo" height={30} className="rounded-md" />
        <h1 className="text-[#171717] font-medium text-lg">Parcel Pilot</h1>
      </div>
      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-[#171717]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md mt-1 z-20">
          <div className="py-2">
            {SIDE_BTNS.map((item, index) => (
              <div key={index}>
                <Link href={`/dashboard${item.url}`} onClick={() => setIsDropdownOpen(false)}>
                  <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </div>
                </Link>
                {item.subBtn && (
                  <div className="pl-8">
                    {item.subBtn.map((sub, idx) => (
                      <Link key={idx} href={`/dashboard${item.url}${sub.url}`} onClick={() => setIsDropdownOpen(false)}>
                        <div className="flex items-center px-4 py-1 text-gray-600 hover:bg-gray-100">
                          <sub.icon className="w-4 h-4 mr-2" />
                          {sub.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2 px-4">
              <ClerkAuthState />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;

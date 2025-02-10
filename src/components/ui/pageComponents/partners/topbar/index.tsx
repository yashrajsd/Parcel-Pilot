import React from 'react'

const TopBar = () => {
  return (
    <div className='w-full px-4 py-4 flex justify-end h-fit absolute top-0 z-[1000]'>
        <button className='bg-[#131313] text-sm p-2 rounded-md bg-[#272727] text-white'>
            Add Partner
        </button>
    </div>
  );
};


export default TopBar
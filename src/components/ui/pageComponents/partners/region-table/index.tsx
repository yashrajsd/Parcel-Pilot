'use client'
import React from 'react';

type REGION = {
    _id: string;
    name: string;
    shiftCounts: number[];
    partnerCount: number;
    location: {
      longitude: string;
      latitude: string;
    };
};

interface RegionTableProps {
  regions?: REGION[]; 
  setLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const RegionTable: React.FC<RegionTableProps> = ({ regions = [] ,setLocation}) => {
  return (
    <div className='w-full font-aeonik'>
      <div className='overflow-x-auto rounded-lg drop-shadow-sm'>
        <table className='min-w-full bg-[#FCFCFC] border-collapse overflow-x-scroll'>
          <thead>
            <tr className='text-left font-normal text-[#5C5C5C]'>
              <th className='px-4 py-2 font-normal'>Region</th>
              <th className='px-4 py-2 font-normal'>Partners</th>
            </tr>
          </thead>
          <tbody>
            {regions.length > 0 ? (
              regions.map((region, index) => (
                <tr key={index} className='text-left text-[#3F4369] cursor-pointer hover:bg-[#FFF]' onClick={()=>{setLocation([parseFloat(region.location.latitude),parseFloat(region.location.longitude)])}}>
                  <td className='px-4 py-4'>{region.name}</td>
                  <td className='px-4 py-4'>{region.partnerCount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-4 text-center text-gray-500">
                  No regions available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegionTable;

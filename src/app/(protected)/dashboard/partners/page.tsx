'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const PartnersMap = dynamic(() => import('@/components/ui/pageComponents/partners/map'), {
  ssr: false, 
});

const RegionTable = dynamic(() => import('@/components/ui/pageComponents/partners/region-table'), {
  ssr: false, 
});

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

const Page = () => {
  const [regions, setRegions] = useState<REGION[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<[number, number]>([19.1204, 72.9051]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch('/api/region', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRegions(data.regions);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    setLoading(true);
    fetchRegions();
  }, []);

  return (
    <div className={`flex flex-1 flex-col gap-2 overflow-y-scroll hide-scrollbar p-4 ${loading && 'animate-pulse'}`}>
      <PartnersMap regions={regions} Location={location} />
      <RegionTable regions={regions} setLocation={setLocation} />
    </div>
  );
};

export default Page;
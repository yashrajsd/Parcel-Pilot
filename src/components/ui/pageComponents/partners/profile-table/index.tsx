import React from 'react';
import ProfileSearch from './search';
import { Profile } from '@/constants/profileData';

interface ProfileTableProps {
  profiles: Profile[];
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const ProfileTable: React.FC<ProfileTableProps> = ({ profiles, setProfile }) => {
  return (
    <div className="w-full px-4 font-aeonik">
      <ProfileSearch />
      
      <div className="overflow-x-auto rounded-lg drop-shadow-sm">
        <div className="w-full overflow-auto">
          <table className="w-full min-w-max bg-[#FCFCFC] border-collapse">
            <thead>
              <tr className="text-left font-normal text-[#5C5C5C] text-sm md:text-base">
                <th className="px-4 py-2 font-normal">Name</th>
                <th className="px-4 py-2 font-normal">Rating</th>
                <th className="px-4 py-2 font-normal">Areas</th>
                <th className="px-4 py-2 font-normal">Active Orders</th>
                <th className="px-4 py-2 font-normal">Shift</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr
                  key={index}
                  className="text-left text-[#3F4369] cursor-pointer hover:bg-[#FFF] text-sm md:text-base"
                  onClick={() => setProfile(profile)}
                >
                  <td className="px-4 py-4">{profile.name}</td>
                  <td className="px-4 py-4">{profile.metrics.rating}</td>
                  <td className="px-4 py-4 flex flex-wrap gap-2 items-center">
                    {profile.areas.map((area, idx) => (
                      <span key={idx} className="bg-gray-200 px-2 py-1 rounded-md text-xs md:text-sm">{area}</span>
                    ))}
                  </td>
                  <td className="px-4 py-4">{profile.currentLoad}</td>
                  <td className="px-4 py-4">{profile.shift.start} - {profile.shift.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileTable;

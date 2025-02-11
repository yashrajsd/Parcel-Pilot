'use client';
import { Profile } from '@/constants/profileData';
import { RotateCcw, UserRound } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type POPUPFORM = {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
};

type REGION = {
    name: string;
    _id: string;
};

const PopupForm: React.FC<POPUPFORM> = ({ profile, setProfile }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [regions, setRegions] = useState<REGION[]>([]);
    const [loading, setLoading] = useState(false);
    const [profileForm, setProfileForm] = useState<Profile>(profile);
    const [selected, setSelected] = useState<string>(profile.areas[0]);
    const [bestShift, setBestShift] = useState<[string, string] | []>()

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/partners/${profile._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileForm),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Profile updated successfully!");
                setProfile(null);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile. Please try again.");
        }
        setLoading(false);
    };


    const fetchList = async () => {
        try {
            const response = await fetch('/api/region/list');
            if (response.ok) {
                const data = await response.json();
                setRegions(data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const fetchBestShift = async () => {
        if (!selected || regions.length === 0) return;
        const region = regions.find((r) => r.name === selected);
        if (!region) return;
        try {
            const id = region._id;
            const response = await fetch(`/api/region/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            const formatTime = (hour: number) => `${hour.toString().padStart(2, "0")}:00`;
            setBestShift([formatTime(data.startHour), formatTime(data.endHour)]);
        } catch (err) {
            console.error("Error fetching region:", err);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchBestShift();
    }, [selected])

    useEffect(() => {
        if (!profile) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setProfile(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profile]);

    useEffect(() => {
        setLoading(true);
        fetchList();
        setProfileForm(profile);
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === 'area') {
            const newArea = e.target.value;
            setSelected(newArea)
            setProfileForm({
                ...profileForm,
                areas: [newArea],
            });
        } else if (e.target.name == 'rating') {
            const rating = parseFloat(e.target.value);
            if (rating > 5 || rating < 0) return
            setProfileForm({
                ...profileForm,
                metrics: {
                    ...profile.metrics,
                    rating: rating
                }
            })
        } else {
            setProfileForm({
                ...profileForm,
                [e.target.name]: e.target.value,
            });
        }
    };
    const handleDelete = async () => {
        if (!profile) return;
        
        const confirmDelete = confirm("Are you sure you want to delete this profile?");
        if (!confirmDelete) return;
    
        setLoading(true);
        try {
            const response = await fetch(`/api/partners/${profile._id}`, {
                method: "DELETE",
            });
    
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                setProfile(null);
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Error deleting profile:", err);
            alert("Failed to delete profile. Please try again.");
        }
        setLoading(false);
    };
    

    const handleShift = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name == "start") {
            setProfileForm({
                ...profileForm,
                shift: {
                    ...profileForm.shift,
                    start: e.target.value
                }
            })
        } else {
            setProfileForm({
                ...profileForm,
                shift: {
                    ...profileForm.shift,
                    end: e.target.value
                }
            })
        }
    }


    const handleReset = () => {
        setProfileForm(profile);
    };

    return (
        <div className="fixed inset-0 font-aeronik z-[99999] bg-[#CDCDCD] bg-opacity-70 flex items-center justify-center lg:p-10">
            <div ref={popupRef} className="bg-white relative min-h-[90%] lg:max-h-[90%] w-full rounded shadow-lg flex flex-col">

                {/* Header */}
                <div className="flex justify-between p-4 items-center shadow-sm">
                    <h1 className="font-bold text-[#606060] text-[0.9rem] flex items-center gap-2">
                        <UserRound className="h-[1.2rem]" /> Profile Details
                    </h1>
                    <button className="text-[#131313]" onClick={() => setProfile(null)}>Close</button>
                </div>

                {/* Scrollable Grid */}
                <div className="flex-1 overflow-y-auto p-5 grid lg:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2 col-span-2">
                        <h1 className="text-[#606060]">Partner Name</h1>
                        <input
                            name="name"
                            placeholder="Name"
                            className="focus:outline-none lg:w-[30%] text-[#282828] bg-[#FCFCFC] border-[1px] p-3 rounded-lg"
                            value={profileForm?.name || ''}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#606060]">Email Address</h1>
                        <input
                            name="email"
                            placeholder="Email"
                            className="focus:outline-none w-[100%] text-[#282828] bg-[#FCFCFC] border-[1px] p-3 rounded-lg"
                            value={profileForm?.email || ''}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#606060]">Phone Number</h1>
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            className="focus:outline-none w-[100%] text-[#282828] bg-[#FCFCFC] border-[1px] p-3 rounded-lg"
                            value={profileForm?.phone || ''}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-2 col-span-2">
                        <h1 className="text-[#606060]">Area</h1>
                        <select
                            className="rounded-lg p-3 text-[#131313] focus:outline-none bg-[#FCFCFC] border-[1px]"
                            name="area"
                            value={profileForm?.areas[0] || ''}
                            onChange={handleChange}
                            disabled={loading}
                        >
                            <option value="">Select Area</option>
                            {regions.map((region, idx) => (
                                <option key={region._id} value={region.name}>
                                    {region.name} {idx === 0 && '(Recommended)'}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#606060]">Shift Start</h1>
                        <input
                            type="time"
                            name="start"
                            value={profileForm?.shift.start || ''}
                            onChange={handleShift}
                            disabled={loading}
                            className="rounded-lg p-3 text-[#131313] focus:outline-none bg-[#FCFCFC] border-[1px] w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#606060]">Shift End</h1>
                        <input
                            type="time"
                            name="end"
                            value={profileForm?.shift.end || ''}
                            onChange={handleShift}
                            disabled={loading}
                            className="rounded-lg p-3 text-[#131313] focus:outline-none bg-[#FCFCFC] border-[1px] w-full"
                        />
                    </div>

                    {/* Best Shift Information */}
                    {bestShift &&
                        <div className='col-span-2 p-4 bg-[#B3BBFF] border-[2px] border-[#2F44FF] text-[#2F44FF]'>
                            <h1>Best shift for this region: <span className='text-bold'>{bestShift[0]} to {bestShift[1]}</span></h1>
                        </div>
                    }

                    <div className="flex flex-col gap-2">
                        <h1 className="text-[#606060]">Rating</h1>
                        <input
                            type="number"
                            name="rating"
                            value={profileForm?.metrics.rating}
                            onChange={handleChange}
                            disabled={loading}
                            className="rounded-lg p-3 text-[#131313] focus:outline-none bg-[#FCFCFC] border-[1px] w-full"
                        />
                    </div>
                </div>

                {/* Footer (Sticky) */}
                <div className="sticky bottom-0 w-full z-[99] p-5 flex justify-between gap-2 items-center bg-white shadow-md">
                    <div className='flex items-center gap-2'>
                        <button className='p-2 border-[#FF4242] border-[1px] text-[#FF4242] border-[1px] rounded-lg' onClick={handleDelete}>Delete</button>
                        <p className='text-[0.8rem] opacity-60'>Will pemanantly delete the partner</p>
                    </div>
                    <div className='flex items-center gap-2'>
                    <button className="p-2 text-[#131313] opacity-70 border-[1px] rounded-lg flex items-center gap-2" onClick={handleReset} disabled={loading}><RotateCcw className='h-5' /> Reset</button>
                    <button className="p-2 border-[1px] text-white bg-[#4F60FF] rounded-lg" disabled={loading} onClick={handleUpdate}>Update Profile</button>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default PopupForm;

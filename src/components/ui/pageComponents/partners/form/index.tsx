'use client';
import { PartnerForm } from '@/constants/registrationForm';
import {  RotateCcw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type RegisterFormProps = {
  form: PartnerForm;
  setForm: React.Dispatch<React.SetStateAction<PartnerForm>>;
  Form: PartnerForm;
};

type REGION = {
  name: string;
  _id: string;
};

const RegisterForm = ({ form, setForm, Form }: RegisterFormProps) => {
  const [error, setError] = useState<string>('');
  const [regions, setRegions] = useState<REGION[]>([]);
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchShift = async () => {
      if (!selected) return;
      setLoading(true);

      try {
        const id = selected;
        const response = await fetch(`/api/region/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        const formatTime = (hour: number) => `${hour.toString().padStart(2, '0')}:00`;

        setForm((prevForm) => ({
          ...prevForm,
          shift: {
            start: formatTime(data.startHour),
            end: formatTime(data.endHour),
          },
        }));
      } catch (err) {
        console.error('Error fetching region:', err);
      }
      setLoading(false);
    };

    fetchShift();
  }, [selected]);

  useEffect(() => {
    setLoading(true);
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await fetch('/api/region/list');
      if (!response.ok) throw new Error('Failed to fetch regions');

      const data = await response.json();
      setRegions(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.phone || !form.email || !form.shift.end || !form.shift.start || form.areas.length === 0 || !form.name) {
      alert('Incomplete credentials');
      return;
    }

    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        setError('There was an error registering the partner.');
      } else {
        router.push('/dashboard/partners/profiles');
      }
    } catch (err) {
      setError('There was an error registering the partner.');
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError('');

    if (e.target.name === 'area') {
      setForm((prev) => ({
        ...prev,
        areas: [e.target.value],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleShift = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      shift: {
        ...prev.shift,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <div className="p-6 flex-1 mx-auto">
      <h1 className="text-[#282828] text-2xl font-semibold">Register Partner</h1>
      <p className="text-[#878787] text-sm">Add a new partner by filling in the details below</p>
      <hr className="my-4" />

      <form className={`grid gap-6 sm:grid-cols-1 md:grid-cols-2 ${loading && 'animate-pulse'}`} onSubmit={handleRegistration}>
        {/* Name Input */}
        <div>
          <label className="block text-[#131313]">Name</label>
          <input
            placeholder="Full Name"
            className="rounded-lg p-3 w-full bg-[#FCFCFC] border-[1px] focus:outline-none"
            value={form.name}
            name="name"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-[#131313]">Phone Number</label>
          <input
            placeholder="Phone"
            className="rounded-lg p-3 w-full bg-[#FCFCFC] border-[1px] focus:outline-none"
            value={form.phone}
            name="phone"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Email Input */}
        <div className="col-span-2">
          <label className="block text-[#131313]">Email Address</label>
          <input
            placeholder="Email"
            type="email"
            className="rounded-lg p-3 w-full bg-[#FCFCFC] border-[1px] focus:outline-none"
            value={form.email}
            name="email"
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Area Selection */}
        <div className="col-span-2">
          <label className="block text-[#131313]">Area</label>
          <select
            disabled={loading}
            className="rounded-lg p-3 w-full bg-[#FCFCFC] border-[1px] focus:outline-none"
            name="area"
            onChange={(e) => {
              const selectedRegion = regions.find((region) => region.name === e.target.value);
              if (selectedRegion) setSelected(selectedRegion._id);
              handleChange(e);
            }}
            value={form.areas[form.areas.length - 1] || ''}
          >
            <option value="">Select Area</option>
            {regions.map((region, idx) => (
              <option key={region._id} value={region.name}>
                {region.name} {idx === 0 && '(Recommended)'}
              </option>
            ))}
          </select>
        </div>

        {/* Shift Timings */}
        {form.areas.length > 0 && (
          <div className="col-span-2 flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="block text-[#131313]">Shift Start</label>
              <input
                type="time"
                name="start"
                value={form.shift.start}
                onChange={handleShift}
                disabled={loading}
                className="rounded-lg p-3 w-full bg-[#FCFCFC] border-[1px] focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[#131313]">Shift End</label>
              <input
                type="time"
                name="end"
                value={form.shift.end}
                onChange={handleShift}
                disabled={loading}
                className="rounded-lg p-3 w-full bg-[#FCFCFC] border-[1px] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="col-span-2 flex gap-4">
          <button className="py-2 px-4 rounded-lg border border-gray-400" type="button" onClick={() => setForm(Form)} disabled={loading}>
            <RotateCcw className="inline h-4" /> Reset
          </button>
          <button className="py-2 px-6 rounded-lg bg-[#5F33FF] text-white" type="submit" disabled={loading}>
            Register
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default RegisterForm;

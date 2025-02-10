'use client'
import RegisterForm from '@/components/ui/pageComponents/partners/form'
import { PartnerForm } from '@/constants/registrationForm'
import React, { useEffect, useState } from 'react'

const Form: PartnerForm = {
  name: '',
  phone: '',
  email: '',
  shift: {
    start: '',
    end: ''
  },
  areas: []
}

const Page = () => {
  const [form, setForm] = useState(Form)
  const [formFilling, setFormFilling] = useState(false)

  useEffect(() => {
    if (form.name || form.areas.length || form.phone || form.shift.end || form.shift.start) {
      setFormFilling(true)
    }else{
      setFormFilling(false);
    }
  }, [form])

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (formFilling) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message; 
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [formFilling]) 

  return (
    <div className='flex-1 h-full'>
      <RegisterForm form={form} setForm={setForm} Form={Form}/>
    </div>
  )
}

export default Page

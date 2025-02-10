import React from 'react'

const Topbar = () => {
    // const [region, setRegion] = useState<string>("All");

    return (
        <div className='w-full border-b-[1px] p-5 flex justify-between items-center'>
            <h1 className='text-[#131313]'>Order Management</h1>
            <select className='bg-[#FCFCFC] border-[1px] px-3 p-2 rounded-md text-[#666666] text-[0.9rem] focus:outline-none'>
                <option>Regional</option>
            </select>
        </div>
    )
}

export default Topbar
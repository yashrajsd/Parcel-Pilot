import AssignmentTable from '@/components/ui/pageComponents/assignments/assignment-table'
import { AssignmentChart } from '@/components/ui/pageComponents/assignments/chart'
import Topbar from '@/components/ui/pageComponents/assignments/topbar'
import React from 'react'

const Page = () => {
  return (
    <div className=''>
      <Topbar />
      <div className='grid lg:grid-cols-2 mt-4'>
        <div className='col-span-2'>
        <AssignmentChart/>
        </div>
      </div>
      <AssignmentTable/>
    </div>
  )
}

export default Page
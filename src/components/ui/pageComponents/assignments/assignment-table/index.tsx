'use client'
import React, { useEffect, useState } from 'react';
import { Assignment } from '@/constants/assignmentData';



const AssignmentTable = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    const fetchAssignments = async()=>{
        try{
            const response = await fetch('/api/assignments',{
                method:"GET",
                headers: { "Content-type": "application/json" }
            })
            if(!response.ok){
                console.error("Error fetching data or assignments table");
                return;
            }
            const data = await response.json();
            setAssignments(data.data)
            console.log(data.data);
        }catch(err){
            console.log(err);
        }
    }


    useEffect(() => {
        fetchAssignments();
    },[])

    return (
        <div className="w-full font-aeonik">

            <div className="overflow-x-auto rounded-lg border-[1px] drop-shadow-sm">
                <div className="w-full overflow-auto ">
                    <table className="w-full min-w-max bg-[#FCFCFC] border-collapse">
                        <thead>
                            <tr className="text-left font-normal text-[#5C5C5C] text-sm md:text-base">
                                <th className="px-4 py-2 font-normal">Order ID</th>
                                <th className="px-4 py-2 font-normal">Partner ID</th>
                                <th className="px-4 py-2 font-normal">Status</th>
                                <th className="px-4 py-2 font-normal">Timestamp</th>
                                <th className="px-4 py-2 font-normal">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.length > 0 ? (
                                assignments.map((assignment, index) => (
                                    <tr key={index} className="text-left text-[#3F4369] cursor-pointer hover:bg-[#FFF] text-sm md:text-base">
                                        <td className="px-4 py-4">{assignment.orderId}</td>
                                        <td className="px-4 py-4">{assignment.partnerId}</td>
                                        <td className={`px-4 py-4 font-medium ${assignment.status === 'success' ? 'text-green-600' : assignment.status === 'failed' ? 'text-red-500' : 'text-yellow-500'}`}>
                                            {assignment.status}
                                        </td>
                                        <td className="px-4 py-4">{new Date(assignment.timestamp).toLocaleString()}</td>
                                        <td className="px-4 py-4">{assignment.reason || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No assignments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignmentTable;

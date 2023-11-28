import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaCalendar, FaClock, FaMoneyBillAlt } from 'react-icons/fa';
const JobCard = ({ job,employe }) => {

  function joningSetter(status) {
    if (status === 'Open') {
      return 'Immediate'
    } else if (status === 'closed') {
      return 'Closed'
    } 
  }
  return (
    <div className="container mx-auto md:w-[100%] sm:w-[45%] m-5">
    <div className="px-6 py-4 border rounded-lg shadow-lg">
      <div className='flex md:flex-row items-center justify-between'>
        <div className='flex flex-col items-start gap-3'>
            <h4 className="text-lg text-[#484848] font-semibold">{job.title}</h4>
            <p className='text-[#8B8B8B]'>{employe.organizationname}</p>
          </div>
         
        </div>
        <div className="flex text-[#8B8B8B] items-center pt-5 gap-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 capitalize">{job.jobtype}</span>
          </div>
        </div>
        <div className='flex text-[#8B8B8B] items-center gap-8 py-6 border-b-2'>

          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2 ">
              <FaCalendar className="" />
              <span className="uppercase text-xs font-medium">Starting</span>
            </div>
            <div className="flex ">
              <span className="text-gray-700">{joningSetter(job.status)}</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaClock className="" />
              <span className="uppercase text-xs font-medium">Duration</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700">1 Year</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaMoneyBillAlt className="" />
              <span className="uppercase text-xs font-medium">Stipend</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700">{job.salary}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <Link className='text-blue-400 border px-2 py-1 rounded-md border-blue-500' href={`/employe/auth/created/job/${job._id}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;



import Link from 'next/link';
import React from 'react';
import { FaMapMarkerAlt, FaCalendar, FaClock, FaMoneyBillAlt } from 'react-icons/fa';

const InternshipCard = ({ internship }) => {

  function convertISODateToCustomFormat(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear().toString().slice(-2); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  }

  return (
    <div className="container mx-auto md:w-[100%] sm:w-[45%] m-5">
      <div className="px-6 py-4 border rounded-lg shadow-lg">
        <div className='flex  md:flex-row items-center justify-between'>
          <div className='flex flex-col items-start gap-3'>
            <h4 className="text-lg text-[#484848] font-semibold">{internship.profile}</h4>
            <p className='text-[#8B8B8B]'>{internship.employe.organizationname}</p>
          </div>
          <div className='mt-4 md:mt-0'>
            <img src={internship.employe.organizationlogo.fileID || internship.employe.organizationlogo.url} alt="organization logo" className='max-h-16' />
          </div>
        </div>
        <div className="flex text-[#8B8B8B] items-center pt-5 gap-2">
          <div className="flex items-center">
            <FaMapMarkerAlt className="" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 capitalize">{internship.internshiptype}</span>
          </div>
        </div>
        <div className='flex text-[#8B8B8B] items-center gap-8 py-6 border-b-2'>

          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2 ">
              <FaCalendar className="" />
              <span className="uppercase text-xs font-medium">Starting</span>
            </div>
            <div className="flex ">
              <span className="text-gray-700">{convertISODateToCustomFormat(internship.from)}</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaClock className="" />
              <span className="uppercase text-xs font-medium">Duration</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700">{internship.duration}</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaMoneyBillAlt className="" />
              <span className="uppercase text-xs font-medium">Stipend</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-700">{internship.stipend.amount}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <Link className='text-blue-400 border px-2 py-1 rounded-md border-blue-500' href={`/student/auth/view/internship/${internship._id}`}>View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;

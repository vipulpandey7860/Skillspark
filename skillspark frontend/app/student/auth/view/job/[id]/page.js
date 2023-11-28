"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FaMapMarkerAlt, FaCalendar, FaClock, FaMoneyBillAlt, FaUserAlt, FaUsers } from 'react-icons/fa';
import { SiStatuspage } from 'react-icons/si';
import { useParams } from 'next/navigation';
import { asyncApplyJob } from "@/store/Actions/studentAction";


const page = () => {

    const { id } = useParams();
    const [job, setjob] = useState({})
    const dispatch = useDispatch();

    const { jobs, student } = useSelector((state) => state.studentReducer);

    useEffect(() => {
        const job = jobs?.find((job) => job._id === id);
        setjob(job);
    }, [jobs, id])

    const ApplyJobHandler = (id) => {
        dispatch(asyncApplyJob(id));
    };

    function joningSetter(status) {
        if (status === 'Open') {
            return 'Immediate'
        } else if (status === 'closed') {
            return 'Closed'
        }
    }

    return (
        <>
            <h2 className='font-bold capitalize text-3xl text-center pt-10'>{job?.title} at {job?.employe?.organizationname}</h2>

            <section class="container mx-auto max-w-5xl border m-6 md:p-4 bg-white shadow-lg rounded-lg">


                <div className="container   m-5 ">
                    <div className=" ">
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col items-start gap-3'>
                                <h4 className="text-lg text-[#484848] font-semibold">{job?.profile}</h4>
                                <p className='text-[#8B8B8B]'>{job?.employe?.organizationname}</p>
                            </div>

                        </div>
                        <div className="flex text-[#8B8B8B] items-center pt-5 gap-2">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-600 capitalize">{job?.jobtype}</span>
                            </div>
                        </div>
                        <div className='grid grid-cols-3 md:flex text-[#8B8B8B] md:w-[95%] items-center gap-8 py-6 border-b-2'>

                            <div className="flex flex-col items-start justify-center gap-2">
                                <div className="flex items-center gap-2 ">
                                    <FaCalendar className="" />
                                    <span className="uppercase text-xs font-medium">Starting</span>
                                </div>
                                <div className="flex ">
                                    <span className="text-gray-700">{joningSetter(job?.status)}</span>
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
                                    <span className="uppercase text-xs font-medium">Salary</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700">{job?.salary}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-center gap-2">
                                <div className="flex items-center gap-2">
                                    <FaUsers className="" />
                                    <span className="uppercase text-xs font-medium">Openings</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700">{job?.openings}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-center gap-2">
                                <div className="flex items-center gap-2">
                                    <SiStatuspage className="" />
                                    <span className="uppercase text-xs font-medium">Status</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700">{job?.status}</span>
                                </div>
                            </div>


                        </div>
                        <div className=" text-[#484848] py-5 flex flex-col items-start justify-center gap-2">
                            <div className="flex items-center gap-2">
                                <FaUserAlt className="" />
                                <span className="uppercase text-xs font-medium">Applicants {job?.students?.length}</span>
                            </div>

                        </div>
                    </div>
                </div>

                <h3 class="px-5 capitalize text-md text-medium text-[#484848] font-semibold">About {job?.employe?.organizationname}</h3>
                <p class=" px-6 text-gray-700">
                    {job?.description}
                </p>


                <h3 class="px-5 text-md text-medium text-[#484848] font-semibold mt-4">Skill's Required</h3>
                <p class=" px-6 list-disc pl-4 text-gray-700">
                    {job?.skills}
                </p>

                <h3 class="text-md text-medium px-5 text-[#484848] font-semibold mt-4">Key Responsibilities</h3>
                <p class=" px-6 list-disc pl-4 text-gray-700">
                    {job?.preferences}
                </p>


                <h3 class="px-5 text-md text-medium text-[#484848] font-semibold mt-4">Assessments</h3>
                <p class=" px-6 list-disc pl-4 text-gray-700">
                    {job?.assesments}
                </p>

                <h3 class="px-5 text-md text-medium text-[#484848] font-semibold mt-4">Perks</h3>
                <p class=" px-6 list-disc pl-4 text-gray-700">
                    {job?.perks}
                </p>

                {!job?.students?.includes(student && student._id) ? (
                    <button
                        className="bg-blue-900 text-white py-2 px-4 rounded-md m-5"
                        onClick={() => ApplyJobHandler(job?._id)}
                    >
                        Apply job
                    </button>
                ) : (
                    <h3 className="bg-red-600 max-w-max text-white py-2 px-4 rounded-md m-5">Already Applied</h3>
                )}
            </section>
        </>
    )
}

export default page
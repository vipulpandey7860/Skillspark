"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaCalendar, FaClock, FaMoneyBillAlt, FaUserAlt, FaUsers } from 'react-icons/fa';
import { SiStatuspage } from 'react-icons/si';
import { useParams } from 'next/navigation';
import { asyncCloseInternship } from '@/store/Actions/employeAction';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { id } = useParams();
    const [internship, setInternship] = useState({});

    const { employe, isAuthenticated } = useSelector((state) => state.employeReducer);

    useEffect(() => {
        employe?.internships?.reduce((acc, internship) => {
            if (internship._id === id) {
                setInternship(internship);
            }
        }, []);
    }, [employe, id]);

    const CloseInternshipHandler = (id) => {
        dispatch(asyncCloseInternship(id));
    };

    function convertISODateToCustomFormat(isoDate) {
        const date = new Date(isoDate);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}/${day}/${year}`;
    }

    // Split skills and perks into arrays
    const skillsArray = internship?.skills ? internship.skills.split(',') : [];
    const perksArray = internship?.perks ? internship.perks.split(',') : [];

    return (
        <>
            {employe?.internships?.length === 0 ? (
                <p className="text-center text-red-500 font-bold mt-4">No internships found</p>
            ) : (
                <>
                    <h2 className="font-bold capitalize text-3xl text-center pt-10">
                        {internship?.profile} at {employe?.organizationname}
                    </h2>

                    <section className="container mx-auto max-w-5xl border m-6 md:p-4 bg-white shadow-lg rounded-lg">
                        <div className="container m-5">
                            <div className="">
                                <div className='flex items-center justify-between'>
                                    <div className='flex flex-col items-start gap-3'>
                                        <h4 className="text-lg text-[#484848] font-semibold">{internship?.profile}</h4>
                                        <p className='text-[#8B8B8B]'>{employe?.organizationname}</p>
                                    </div>
                                </div>
                                <div className="flex text-[#8B8B8B] items-center pt-5 gap-2">
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 capitalize">{internship?.internshiptype}</span>
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 md:flex text-[#8B8B8B] md:w-[95%] items-center gap-8 py-6 border-b-2'>

                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <div className="flex items-center gap-2 ">
                                            <FaCalendar className="" />
                                            <span className="uppercase text-xs font-medium">Starting</span>
                                        </div>
                                        <div className="flex ">
                                            <span className="text-gray-700">{convertISODateToCustomFormat(internship?.from)}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <FaClock className="" />
                                            <span className="uppercase text-xs font-medium">Duration</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-700">{internship?.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <FaMoneyBillAlt className="" />
                                            <span className="uppercase text-xs font-medium">Stipend</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-700">{internship?.stipend?.amount}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="" />
                                            <span className="uppercase text-xs font-medium">Openings</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-700">{internship?.openings}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start justify-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <SiStatuspage className="" />
                                            <span className="uppercase text-xs font-medium">Status</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-gray-700">{internship?.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className=" text-[#484848] py-5 flex flex-col items-start justify-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <FaUserAlt className="" />
                                        <span className="uppercase text-xs font-medium">Applicants {internship?.employes?.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="px-5 capitalize text-md text-medium text-[#484848] font-semibold">About {employe?.organizationname}</h3>
                        <p className="px-6 text-gray-700">
                            {internship?.description}
                        </p>

                        <h3 className="px-5 text-md text-medium text-[#484848] font-semibold mt-4">Skill's Required</h3>
                        <div className="px-6">
                            {skillsArray.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 px-2 py-1 rounded-full m-2 inline-block"
                                >
                                    {skill.trim()}
                                </div>
                            ))}
                        </div>

                        <h3 className="text-md text-medium px-5 text-[#484848] font-semibold mt-4">Key Responsibilities</h3>
                        <p className="px-6 list-disc pl-4 text-gray-700">
                            {internship?.responsibilities}
                        </p>

                        <h3 className="px-5 text-md text-medium text-[#484848] font-semibold mt-4">Assessments</h3>
                        <p className="px-6 list-disc pl-4 text-gray-700">
                            {internship?.assesments}
                        </p>

                        <h3 className="px-5 text-md text-medium text-[#484848] font-semibold mt-4">Perks</h3>
                        <div className="px-6">
                            {perksArray.map((perk, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100  px-2 py-1 rounded-full p-2 m-2 inline-block"
                                >
                                    {perk.trim()}
                                </div>
                            ))}
                        </div>

                        {internship?.status === "Open" ? (
                            <button
                                className="bg-red-600 text-white py-2 px-4 rounded-md m-5"
                                onClick={() => CloseInternshipHandler(internship?._id)}
                            >
                                Close internship
                            </button>
                        ) : (
                            <h3 className="bg-blue-600 max-w-max text-white py-2 px-4 rounded-md m-5">Internship closed</h3>
                        )}
                    </section>
                </>
            )}
        </>
    );
};

export default Page;

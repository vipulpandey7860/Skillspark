"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInMonths, format } from 'date-fns';

import { asyncCreateInternship } from '@/store/Actions/employeAction';
import { useRouter } from 'next/navigation';
const InternshipCreation = () => {
    const dispatch = useDispatch();
    const router = useRouter();

  const { errors } = useSelector((state) => state.employeReducer);
    

    const [internshipData, setInternshipData] = useState({
        profile: '',
        skills: '', 
        internshiptype: 'Remote',
        openings: '',
        from: null,
        to: null,
        responsibilities: '',
        stipend: {
            amount: 0, 
            mode: 'Paid',
        },
        perks: '', 
        description: '',
        status: 'Open',
        assesments: '',
        duration: '', 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Check if the input name contains a dot (indicating nested fields)
        if (name.includes('.')) {
            const [parentName, childName] = name.split('.');
            setInternshipData({
                ...internshipData,
                [parentName]: {
                    ...internshipData[parentName],
                    [childName]: value,
                },
            });
        } else {
            setInternshipData({
                ...internshipData,
                [name]: value,
            });
        }
    };

    const handleStartDateChange = (date) => {
        setInternshipData({
            ...internshipData,
            from: date,
        });
    };

    const handleEndDateChange = (date) => {
        setInternshipData({
            ...internshipData,
            to: date,
        });
    };
    useEffect(() => {
        if (internshipData.from && internshipData.to) {
            const startDate = new Date(internshipData.from);
            const endDate = new Date(internshipData.to);
    
            const yearDiff = endDate.getUTCFullYear() - startDate.getUTCFullYear();
            const monthDiff = endDate.getUTCMonth() - startDate.getUTCMonth();
    
            const durationInMonths = yearDiff * 12 + monthDiff;
    
            const formattedDuration = `${durationInMonths} ${durationInMonths === 1 ? 'month' : 'months'}`;
    
            setInternshipData({
                ...internshipData,
                duration: formattedDuration,
            });
        }
    }, [internshipData.from, internshipData.to]);

    const createInternshipHandler = () => {
        dispatch(asyncCreateInternship(internshipData));
        router.push('/employe/auth');

    };


    return (
        <div className="border rounded-lg mt-5 order-first xl:col-span-8 md:m-10">
            <div className="bg-secondary shadow card">
                <div className="bg-white border-0 card-header">
                    <div className="flex items-center justify-between p-5">
                        <h3 className="text-center text-4xl font-bold">Create Internship</h3>
                    </div>
                </div>
                <div className="card-body px-5 text-[#314362]">
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-10 border-b">
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="profile" className="form-control-label">Profile</label>
                                <input
                                    type="text" required
                                    id="profile"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Profile"
                                    name="profile"
                                    value={internshipData.profile}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="internshiptype" className="form-control-label">Internship Type</label>
                                <select
                                    id="internshiptype"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    name="internshiptype"
                                    value={internshipData.internshiptype}
                                    onChange={handleInputChange}
                                >
                                    <option value="Remote">Remote</option>
                                    <option value="In office">In office</option>
                                </select>
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="from" className="form-control-label">Internship Start Date</label>
                                <DatePicker
                                    id="from"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    selected={internshipData.from}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yy" // Set the desired date format
                                    placeholderText="Select Start Date"
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="to" className="form-control-label">Internship End Date</label>
                                <DatePicker
                                    id="to"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    selected={internshipData.to}
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yy" // Set the desired date format
                                    placeholderText="Select End Date"
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="duration" className="form-control-label">Duration</label>
                                <input
                                    type="text"
                                    required
                                    id="duration"
                                    placeholder="Duration"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    value={internshipData.duration}
                                    readOnly
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="openings" className="form-control-label">Openings</label>
                                <input
                                    type="number"
                                    id="openings"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Openings"
                                    name="openings"
                                    value={internshipData.openings}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-10 border-b">

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="stipend.amount" className="form-control-label">Stipend Amount</label>
                                <input
                                    type="number"
                                    required
                                    id="stipend.amount"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Stipend Amount"
                                    name="stipend.amount"
                                    value={internshipData.stipend.amount}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="stipend.mode" className="form-control-label">Stipend Mode</label>
                                <select
                                    id="stipend.mode"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    name="stipend.mode"
                                    required
                                    value={internshipData.stipend.mode}
                                    onChange={handleInputChange}
                                >
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Fixed">Fixed</option>
                                    <option value="Performance Based">Performance Based</option>
                                </select>
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="skills" className="form-control-label">Skills</label>
                                <textarea
                                    rows="4" // Changed to textarea
                                    id="skills"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Skills"
                                    name="skills"
                                    required
                                    value={internshipData.skills}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="responsibilities" className="form-control-label">Responsibilities</label>
                                <textarea
                                    rows="4"
                                    id="responsibilities"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Responsibilities"
                                    name="responsibilities"
                                    value={internshipData.responsibilities}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="perks" className="form-control-label">Perks</label>
                                <textarea
                                    rows="4" // Changed to textarea
                                    id="perks"
                                    className="form-i
                                    requirednput p-2 border rounded-md shadow-md"
                                    placeholder="Perks"
                                    name="perks"
                                    value={internshipData.perks}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="description" className="form-control-label">About company</label>
                                <textarea
                                    rows="4"
                                    id="description"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Description"
                                    name="description"
                                    value={internshipData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="assesments" className="form-control-label">Assessments</label>
                                <textarea
                                    rows="4"
                                    id="assesments"
                                    required
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Assessments"
                                    name="assesments"
                                    value={internshipData.assesments}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="status" className="form-control-label">Status</label>
                                <select
                                    id="status"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    name="status"
                                    required
                                    value={internshipData.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={createInternshipHandler}
                            className="p-2 bg-blue-400 rounded-md m-5 text-white"
                        >
                            Create Internship
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InternshipCreation;

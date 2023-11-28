"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateJob } from '@/store/Actions/employeAction';
import { useRouter } from 'next/navigation';
const CreateJobComponent = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { errors } = useSelector((state) => state.employeReducer);

    const [jobData, setJobData] = useState({
        title: '',
        skills: '',
        jobtype: 'Remote',
        openings: '',
        salary: 0,
        perks: '',
        description: '',
        assesments: '',
        preferences: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setJobData({
            ...jobData,
            [name]: value,
        });
    };

    const createJobHandler = () => {
        dispatch(asyncCreateJob(jobData));
        router.back()

        if (!errors) {
            router.back()
        }
    };

    return (
        <div className="border rounded-lg mt-5 order-first xl:col-span-8 md:m-10">
            <div className="bg-secondary shadow card">
                <div className="bg-white border-0 card-header">
                    <div className="flex items-center justify-between p-5">
                        <h3 className="text-center text-4xl font-bold">Create Job</h3>
                    </div>
                </div>
                <div className="card-body px-5 text-[#314362]">
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2    gap-4 px-4 py-10 border-b">
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="title" className="form-control-label">Job Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Job Title"
                                    name="title"
                                    value={jobData.title}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="openings" className="form-control-label">Openings</label>
                                <input
                                    type="number"
                                    id="openings"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Openings"
                                    name="openings"
                                    value={jobData.openings}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="jobtype" className="form-control-label">Job Type</label>
                                <select
                                    id="jobtype"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    name="jobtype"
                                    value={jobData.jobtype}
                                    onChange={handleInputChange}
                                >
                                    <option value="Remote">Remote</option>
                                    <option value="In office">In office</option>
                                </select>
                            </div>

                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="salary" className="form-control-label">Salary</label>
                                <input
                                    type="number"
                                    id="salary"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Salary"
                                    name="salary"
                                    value={jobData.salary}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="skills" className="form-control-label">Skills <span className='text-xs ml-1'>(Comma seperated)</span> </label>
                                <textarea
                                    rows="4"
                                    id="skills"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Skills"
                                    name="skills"
                                    value={jobData.skills}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="perks" className="form-control-label">Perks  <span className='text-xs ml-1'>(Comma seperated)</span></label>
                                <textarea
                                    rows="4"
                                    id="perks"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Perks"
                                    name="perks"
                                    value={jobData.perks}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="description" className="form-control-label">About company</label>
                                <textarea
                                    rows="4"
                                    id="description"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Description"
                                    name="description"
                                    value={jobData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="assesments" className="form-control-label">assesments</label>
                                <textarea
                                    rows="4"
                                    id="assesments"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="assesments"
                                    name="assesments"
                                    value={jobData.assesments}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group flex flex-col gap-2">
                                <label htmlFor="preferences" className="form-control-label">Preferences</label>
                                <textarea
                                    rows="4"
                                    id="preferences"
                                    className="form-input p-2 border rounded-md shadow-md"
                                    placeholder="Preferences"
                                    name="preferences"
                                    value={jobData.preferences}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={createJobHandler}
                            className="p-2 bg-blue-400 rounded-md  m-5 text-white"
                        >
                            Create Job
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJobComponent;

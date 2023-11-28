"use client"
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const { student, jobs ,internships} = useSelector((state) => state.studentReducer); // Import the 'jobs' array
  const [displayJobs, setDisplayJobs] = useState(true); // State for toggling between jobs and internships

  // Create a mapping of job data by ID
  const jobDataById = {};
  if (jobs) {
    jobs.forEach((job) => {
      jobDataById[job._id] = job;
    });
  }

   // Create a mapping of internship data by ID
   const internshipDataById = {};
   if (internships) {
     internships.forEach((intern) => {
      internshipDataById[intern._id] = intern;
     });
   }

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl text-center py-5 font-semibold mb-4">
          {displayJobs ? 'Jobs' : 'Internships'} applied by {student && student.firstname}
        </h1>

        {/* Toggle button */}
        <div className="mb-4 flex justify-center">
          <button
            className={`px-4 py-2 mx-5 rounded-md ${
              displayJobs ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setDisplayJobs(true)}
          >
            Jobs
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              !displayJobs ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            onClick={() => setDisplayJobs(false)}
          >
            Internships
          </button>
        </div>

        {/* Application List */}
        <div className="border border-gray-300 rounded-lg p-4">
          {/* Table Header */}
          <div className="bg-gray-200 p-2 rounded-t-lg">
            <div className="grid grid-cols-6 text-center font-semibold">
              <div>Company</div>
              <div>Profile</div>
              <div>Type</div>
              <div>Openings</div>
              <div>Applications</div>
              <div>Status</div>
            </div>
          </div>

          {/* Table Body */}
          {displayJobs
            ? student && student.jobs.map((application) => (
                <div key={application._id} className="border-t border-gray-300 p-2 hover:bg-gray-100">
                  <div className="grid grid-cols-6 text-center">
                    <div className="text-center ">
                      {jobDataById[application._id] ? jobDataById[application._id].employe.organizationname : 'No name'}
                    </div>
                    <div>{application.title}</div>
                    <div>{application.jobtype}</div>
                    <div>{application.openings}</div>
                    <div>{application.students.length}</div>
                    <div>{application.status}</div>
                  </div>
                </div>
              ))
            : student && student.internships.map((application) => (
                <div key={application.id} className="border-t border-gray-300 p-2 hover:bg-gray-100">
                  <div className="grid grid-cols-6 text-center">
                    <div className="text-center">{internshipDataById[application._id] ? internshipDataById[application._id].employe.organizationname : 'No name'}</div>
                    <div>{application.profile}</div>
                    <div>{application.internshiptype}</div>
                    <div>{application.openings}</div>
                    <div>{application.students.length}</div>
                    <div>{application.status}</div>
                  </div>
                </div>
              ))}

          {/* No applications message */}
          {(!displayJobs ? student && student.internships.length === 0 : student && student.jobs.length === 0) && (
            <div className="text-center text-gray-600 p-4">No {displayJobs ? 'job' : 'internship'} applications found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

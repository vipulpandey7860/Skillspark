"use client"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import InternshipCard from "@/components/employe ui/InternshipCard";
import JobCard from "@/components/employe ui/JobCard";

const Page = () => {
  const { employe } = useSelector((state) => state.employeReducer);
  const [showInternships, setShowInternships] = useState(true);

  const toggleContent = (value) => {
    setShowInternships(value);
  };

  const internshipList = employe ? employe.internships : [];
  const jobList = employe ? employe.jobs : [];

  return (
    <>
      <h1 className="text-center font-semibold py-5 text-3xl">
        Internships and Jobs created by {employe && employe.firstname}
      </h1>

      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => toggleContent(true)}
          className={`${
            showInternships ? "bg-blue-500 text-white" : "bg-gray-300"
          } px-4 py-2 rounded-lg`}
        >
          Internships
        </button>
        <button
          onClick={() => toggleContent(false)}
          className={`${
            !showInternships ? "bg-blue-500 text-white" : "bg-gray-300"
          } px-4 py-2 rounded-lg`}
        >
          Jobs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4">
        {showInternships
          ? internshipList.length === 0 ? (
              <p className="text-red-500 font-semibold text-end p-10 relative left-80">No internships found.</p>
            ) : (
              internshipList.map((internship) => (
                <InternshipCard internship={internship} key={internship._id} employe={employe} />
              ))
            )
          : jobList.length === 0 ? (
              <p className="text-red-500 font-semibold text-end p-10 relative left-80">No jobs found.</p>
            ) : (
              jobList.map((job) => (
                <JobCard job={job} key={job.id} employe={employe} />
              ))
            )}
      </div>
    </>
  );
};

export default Page;

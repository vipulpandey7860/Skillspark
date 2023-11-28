"use client"
import InternshipCard from "@/components/student ui/InternshipCard";
import JobCard from "@/components/student ui/JobCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// export const metadata = {
//   title: 'Student | Home',
// };

const Page = () => {
  const { jobs, internships, student } = useSelector((state) => state.studentReducer);
  const [showInternships, setShowInternships] = useState(true);

  useEffect(() => {
    // Add any necessary side effects here
  }, [student]);

  const toggleInternshipJob = () => {
    setShowInternships(!showInternships);
  };

  const noDataMessage = showInternships ? "No internships available" : "No jobs available";

  return (
    <div className="container mt-10 px-4">
      <div className="flex flex-col items-center gap-4 py-10">
        <h2 className="font-bold text-4xl">Hi, {student && student.firstname}👋</h2>
        <p className="text-2xl font-normal text-[#333333]">Let’s help you land your dream career</p>
      </div>

      <div className="flex justify-center my-4">
        <button
          className={`mx-2 py-2 px-4 rounded-md ${showInternships ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-700"
            }`}
          onClick={toggleInternshipJob}
        >
          Internships
        </button>
        <button
          className={`mx-2 py-2 px-4 rounded-md ${!showInternships ? "bg-blue-900 text-white" : "bg-gray-300 text-gray-700"
            }`}
          onClick={toggleInternshipJob}
        >
          Jobs
        </button>
      </div>

      <p className="text-center text-2xl font-semibold py-4">
        {internships?.length > 0 || jobs?.length > 0
          ? `Available ${showInternships ? "Internships" : "Jobs"} for ${student && student.firstname}`
          : noDataMessage}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {showInternships
          ? internships && internships.length > 0 ? (
              internships.map((internship) => (
                <InternshipCard key={internship._id} internship={internship} />
              ))
            ) : null
          : jobs && jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))
            ) : null}
      </div>
    </div>
  );
};

export default Page;

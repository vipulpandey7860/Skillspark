"use client"
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import InternshipCard from "@/components/employe ui/InternshipCard";
import JobCard from "@/components/employe ui/JobCard";

// export const metadata = {
//   title: 'employe | Home',
// };

const Page = () => {
  const [showInternships, setShowInternships] = useState(true);
  const { employe } = useSelector((state) => state.employeReducer);

  // Filter and limit the display to 3 internships and jobs for each view
  const displayedItems = showInternships
    ? employe?.internships.slice(0, 3) // Display up to 3 internships
    : employe?.jobs.slice(0, 3); // Display up to 3 jobs

  return (
    <>
      <div className="container mx-auto text-center py-5">
        <div className="flex flex-col gap-3 items-center py-5">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800">
            Welcome, {employe?.firstname} {employe?.lastname}
          </h1>
          <p className="font-medium">What's on your mind today!</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center ">
          <Link
            href="/employe/auth/create/job"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mx-4 my-2 md:my-0 hover:bg-blue-700"
          >
            Create Job
          </Link>
          <Link
            href="/employe/auth/create/internship"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg mx-4 hover:bg-green-700"
          >
            Create Internship
          </Link>
        </div>

        <div className="mt-4 pl-10">
          <p className="text-left p-5 font-medium text-xl md:text-2xl">Recently Created</p>
          <div className="flex flex-row items-center justify-center md:justify-start mt-2">
            <button
              className={`${
                showInternships ? "bg-blue-500" : "bg-gray-300"
              } text-white font-semibold py-2 px-4 rounded-lg mx-4 my-2 md:my-0 hover:bg-blue-700`}
              onClick={() => setShowInternships(true)}
            >
              Internships
            </button>
            <button
              className={`${
                !showInternships ? "bg-green-500" : "bg-gray-300"
              } text-white font-semibold py-2 px-4 rounded-lg mx-4 my-2 md:my-0 hover:bg-green-700`}
              onClick={() => setShowInternships(false)}
            >
              Jobs
            </button>
          </div>
        </div>

        <div className="mt-4 p-5">
          {displayedItems?.length === 0 ? (
            <p className="text-red-500 font-semibold">No {showInternships ? "internships" : "jobs"} found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedItems?.map((item) =>
                showInternships ? (
                  <InternshipCard
                    internship={item}
                    key={item._id}
                    employe={employe}
                  />
                ) : (
                  <JobCard job={item} key={item.id} employe={employe} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

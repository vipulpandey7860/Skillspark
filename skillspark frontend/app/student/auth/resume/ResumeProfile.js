import {  useSelector } from "react-redux";
import { FaPhone, FaEnvelope,  FaMapMarker, } from 'react-icons/fa';

const ResumeProfile = () => {
  const { student } = useSelector((state) => state.studentReducer);

  return (
    <div className="container ">
      <section className="section_left gap-12 md:gap-1 border mx-5 p-4">
        <div className="">
          <h3 className="text-4xl font-medium py-2 capitalize mt-4">
            {student && student.firstname} {student && student.lastname}
          </h3>
        </div>
        <ul className="pl-4 mt-2 flex flex-col gap-2">
          <li className="flex items-center gap-4 opacity-60">
            <FaPhone className="mr-2" /> {student && student.contact}
          </li>
          <li className="flex items-center gap-4 opacity-60">
            <FaEnvelope className="mr-2" /> {student && student.email}
          </li>
          <li className="flex items-center gap-4 opacity-60">
            <FaMapMarker className="mr-2" /> {student && student.address}
          </li>
        </ul>
       
      </section>
    </div>
  );
};

export default ResumeProfile;

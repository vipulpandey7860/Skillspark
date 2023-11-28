import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { asyncDeleteStudent, asyncSignoutStudent } from '@/store/Actions/studentAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, student } = useSelector(state => state.studentReducer);
  const [internshipDropdownVisible, setInternshipDropdownVisible] = useState(false);
  const [jobDropdownVisible, setJobDropdownVisible] = useState(false);
  const [courseDropdownVisible, setCourseDropdownVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);

  const signoutHandler = () => {
    dispatch(asyncSignoutStudent());
    router.push('/student/auth');
  };

  const toggleInternshipDropdown = () => {
    setInternshipDropdownVisible(!internshipDropdownVisible);
  };

  const toggleJobDropdown = () => {
    setJobDropdownVisible(!jobDropdownVisible);
  };

  const toggleCourseDropdown = () => {
    setCourseDropdownVisible(!courseDropdownVisible);
  };

  const toggleLoginModal = () => {
    setLoginModalVisible(!isLoginModalVisible);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const accountDeleteHandler = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      dispatch(asyncDeleteStudent());
    }
  };

  return (
    <header className="bg-white shadow-md text-[#676566] font-semibold">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-8">
        <Link href={isAuthenticated ? "/student/auth" : "/student"} className="logo cursor-pointer">
          <img
            className="w-32"
            src="https://internshala.com/static/images/common/new_internshala_logo.svg"
            alt="InternShala"
          />
        </Link>
        <nav className="flex space-x-6 lg:space-x-10">
          <ul id="nav_link" className="hidden lg:flex space-x-6">
            <li
              className={`relative group ${internshipDropdownVisible ? 'hover-open' : ''}`}
              onMouseEnter={toggleInternshipDropdown}
              onMouseLeave={toggleInternshipDropdown}
            >
              <div className="nav-hover cursor-pointer flex items-center">
                Internships <FaCaretDown className={`ml-1 h-4 w-4 transform ${internshipDropdownVisible ? 'rotate-180' : ''}`} />
              </div>
              {internshipDropdownVisible && (
                <div className="absolute z-20  font-normal p-4 w-96 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h5>Location</h5>
                      <h5>Profile</h5>
                      <h5>Category</h5>
                      <h5>Specialization</h5>
                      <p>with Guaranteed internships</p>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <a href="#">Work from Home</a>
                        </li>
                        <li>
                          <a href="#">Internship in Bangalore</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li
              className={`relative group ${jobDropdownVisible ? 'hover-open' : ''}`}
              onMouseEnter={toggleJobDropdown}
              onMouseLeave={toggleJobDropdown}
            >
              <div className="nav-hover cursor-pointer flex items-center">
                Jobs <FaCaretDown className={`ml-1 h-4 w-4 transform ${jobDropdownVisible ? 'rotate-180' : ''}`} />
              </div>
              {jobDropdownVisible && (
                <div className="absolute z-20 font-normal p-4 w-96 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h5>Location</h5>
                      <h5>Profile</h5>
                      <h5>Category</h5>
                      <h5>Specialization</h5>
                      <p>with Guaranteed jobs</p>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <a href="#">Work from Home</a>
                        </li>
                        <li>
                          <a href="#">Jobs in Bangalore</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
            <li
              className={`relative group ${courseDropdownVisible ? 'hover-open' : ''}`}
              onMouseEnter={toggleCourseDropdown}
              onMouseLeave={toggleCourseDropdown}
            >
              <div className="nav-hover cursor-pointer flex items-center">
                Courses <span className="offer bg-yellow-500 px-2 ml-2 rounded-md text-white">OFFER</span>{' '}
                <FaCaretDown className={`ml-1 h-4 w-4 transform ${courseDropdownVisible ? 'rotate-180' : ''}`} />
              </div>
              {courseDropdownVisible && (
                <div className="absolute z-20  font-normal p-4 w-96 bg-white rounded-lg shadow-md">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <h5>Most Popular</h5>
                      <h5>Programming</h5>
                    </div>
                    <div>
                      <ul>
                        <li>
                          <a href="#">Web Development</a>
                        </li>
                        <li>
                          <a href="#">Digital Marketing</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
        <div className="space-x-4 mt-4 lg:mt-0">
          {isAuthenticated ? (
            <>
              <div
                className={`relative group z-20 ${profileDropdownVisible ? 'hover-open' : ''}`}
                onMouseEnter={toggleProfileDropdown}
                onMouseLeave={toggleProfileDropdown}
              >
                <div className="nav-hover cursor-pointer flex items-center">
                  <div className=" rounded-full border p-1">
                    <img src={student?.avatar?.url || student?.avatar?.fileID} alt="profile" className="w-8 h-8 rounded-full" />
                  </div>
                  <FaCaretDown className={`ml-1 h-4 w-4 transform ${profileDropdownVisible ? 'rotate-180' : ''}`} />
                </div>
                {profileDropdownVisible && (
                  <div className="hover flex flex-col gap-4 absolute right-0 font-semibold p-4 w-40 bg-white rounded-lg shadow-md">
                    <Link className="hover:text-blue-500" href="/student/auth">Home</Link>
                    <Link className="hover:text-blue-500" href="/student/auth/profile">Profile</Link>
                    <Link className="hover:text-blue-500" href="/student/auth/resume">Resume</Link>
                    <Link className="hover:text-blue-500" href="/student/auth/applied">Applied</Link>
                    <button onClick={signoutHandler} className="hover:text-blue-500 text-left">Logout</button>
                    <button onClick={accountDeleteHandler} className="hover:text-blue-500 text-left">Delete account</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/student/signin" className="button font-normal px-4 py-1 rounded-md bg-white text-blue-500 border border-blue-500">
                Login
              </Link>
              <Link href="/student/signup" className="button font-normal px-4 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white" id="register">
                Register
              </Link>
              <Link className='pl-4 border-l-2' href="/employe">Hire Talent</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { asyncDeleteEmploye, asyncSignoutemploye } from '@/store/Actions/employeAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, employe } = useSelector(state => state.employeReducer)
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);


  const signoutHandler = () => {
    dispatch(asyncSignoutemploye());
    router.push('/employe/auth');
  }


  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
  };

  const accountDeleteHandler = () => {
    if (confirm('Are you sure you want to delete your account?')) {
      dispatch(asyncDeleteEmploye());

    }
  };  

  return (
    <header className="bg-white shadow-md text-[#676566] font-semibold">
     <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-8">
        <Link href={isAuthenticated ? "/employe/auth" : "/employe"} className="logo cursor-pointer">
          <img
            className="w-32"
            src="https://internshala.com/static/images/common/new_internshala_logo.svg"
            alt="InternShala"
          />
        </Link>
                <div className="space-x-4">
          {isAuthenticated ? (

            <>

              <div
                className={`relative group ${profileDropdownVisible ? 'hover-open' : ''}`}
                onMouseEnter={toggleProfileDropdown}
                onMouseLeave={toggleProfileDropdown}
              >
                <div className="nav-hover cursor-pointer flex items-center">
                  <div className=" rounded-full border p-1">
                    {
                      <img src={employe?.organizationlogo.url || employe?.organizationlogo.fileID} alt="profile" className="w-8 h-8 rounded-full" />

                    }
                    
                  </div>
                  <FaCaretDown className={`ml-1 h-4 w-4 transform ${profileDropdownVisible ? 'rotate-180' : ''}`} />

                </div>
                {profileDropdownVisible && (
                  <div className="hover flex flex-col gap-4 absolute right-0 font-semibold   p-4 w-40 bg-white rounded-lg shadow-md">
                        <Link className="hover:text-blue-500" href="/employe/auth">Home</Link>

                        <Link className="hover:text-blue-500" href="/employe/auth/profile">Profile</Link>
                        <Link className="hover:text-blue-500" href="/employe/auth/created">Created jobs & internships</Link>
                        <button
                          onClick={signoutHandler}
                          className="hover:text-blue-500 text-left"
                        >
                          Logout
                    </button>
                    <button
                          onClick={accountDeleteHandler}
                          className="hover:text-blue-500 text-left"
                        >
                          Delete account
                        </button>
                  </div>
                )}
              </div>

            </>) :

            (<>

<>
              <Link href="/employe/signin" className="button font-normal px-4 py-1 rounded-md bg-white text-blue-500 border border-blue-500">
                Login
              </Link>
                <Link href="/employe/signup" className="button font-normal px-4 py-1 rounded-md bg-blue-500 hover:bg-blue-700 text-white" id="register">
                Register
              </Link>
                <Link className='pl-4 border-l-2' href="/student">I'm Student</Link>
            </>

            </>)

          }


        </div>
      </div>
    </header>
  );
};

export default Navbar;

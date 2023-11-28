import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { asyncSigninStudent } from '@/store/Actions/studentAction';
import { asyncSigninemploye } from '@/store/Actions/employeAction';

import Link from 'next/link';

const Signin = () => {
    const [loginFormVisible, setLoginFormVisible] = useState(true);
    const [loginAsStudent, setLoginAsStudent] = useState(true);

    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated } = useSelector((state) => state.employeReducer);

    // Separate state variables for form input values
    const [studentLoginForm, setStudentLoginForm] = useState({
        email: '',
        password: '',
    });

    const [employeeLoginForm, setEmployeeLoginForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/employe/auth');
        }
    }, [isAuthenticated]);

    const signinStudentHandler = (e) => {
        e.preventDefault();
        dispatch(asyncSigninStudent(studentLoginForm));
        router.push('/student/auth');

    };

    const signinEmployeHandler = (e) => {
        e.preventDefault();
        dispatch(asyncSigninemploye(employeeLoginForm));
        router.push('/employe/auth');

    };

    const siginPageCloseHandler = () => {
        router.back();
    };

    const handleLoginOptionChange = (isStudent) => {
        if (isStudent !== loginAsStudent) {
            setLoginFormVisible(false);
            setTimeout(() => {
                setLoginAsStudent(isStudent);
                setLoginFormVisible(true);
            }, 100);
        }
    };

    const handleStudentInputChange = (e) => {
        const { name, value } = e.target;
        setStudentLoginForm({
            ...studentLoginForm,
            [name]: value,
        });
    };

    const handleEmployeeInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeLoginForm({
            ...employeeLoginForm,
            [name]: value,
        });
    };

    return (
        <div className="absolute top-0 left-0 h-screen w-screen bg-gray-800 bg-opacity-25 flex items-center justify-center">
            <div className="relative group overflow-hidden h-[70vh] w-[40vw] bg-white p-5 rounded-md shadow-lg">
                <h3 className="text-center text-xl text-blue-500 font-normal px-4 py-2 relative">
                    Login
                    <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        onClick={siginPageCloseHandler}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </h3>
                <div className="flex mt-2">
                    <button
                        className={`flex-1 text-center cursor-pointer py-2 ${loginAsStudent ? 'border-b-2 border-blue-500' : ''
                            }`}
                        onClick={() => handleLoginOptionChange(true)}
                    >
                        Student
                    </button>
                    <button
                        className={`flex-1 text-center cursor-pointer py-2 ${!loginAsStudent ? 'border-b-2 border-blue-500' : ''
                            }`}
                        onClick={() => handleLoginOptionChange(false)}
                    >
                        Employee
                    </button>
                </div>
                <AnimatePresence>
                    {loginFormVisible && (
                        <motion.div
                            className="hover absolute font-normal p-4 w-96 bg-white rounded-lg"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <form onSubmit={loginAsStudent ? signinStudentHandler : signinEmployeHandler}>
                                {loginAsStudent ? (
                                    <>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder='Enter your email'
                                                required
                                                value={studentLoginForm.email}
                                                onChange={handleStudentInputChange}
                                                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder='Enter your password'
                                                required
                                                value={studentLoginForm.password}
                                                onChange={handleStudentInputChange}
                                                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3 py-2'>
                                            <Link href="/student/forget" className="text-blue-400  ">
                                                forgot password?
                                            </Link>
                            <Link className="text-blue-400" href="/student/signup">Create account?</Link>

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder='Enter your email'
                                                required
                                                value={employeeLoginForm.email}
                                                onChange={handleEmployeeInputChange}
                                                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder='Enter your password'
                                                required
                                                value={employeeLoginForm.password}
                                                onChange={handleEmployeeInputChange}
                                                className="mt-1 px-3 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className='flex flex-col gap-3 py-2'>
                                            <Link href="/employe/forget" className="text-blue-400  ">
                                                forgot password?
                                                </Link>
                            <Link className="text-blue-400" href="/employe/signup">Create account?</Link>
                                                
                                        </div>
                                    </>
                                )}
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white font-normal px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Login
                                </button>
                            </form>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Signin;

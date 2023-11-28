"use client"

import { asyncGetInternships, asyncGetJobs } from '@/store/Actions/studentAction';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// export const metadata = {
//   title: 'Student | Home',
// }

const StudentAuth = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
  const { isAuthenticated,errors } = useSelector(state => state.studentReducer)
  

  useEffect(() => {
       if (!isAuthenticated) {
      router.push('/student/')
    }

    if (isAuthenticated) {
      dispatch(asyncGetJobs());
      dispatch(asyncGetInternships());
    }

  }, [isAuthenticated])
  return (
    children
  )
}

export default StudentAuth
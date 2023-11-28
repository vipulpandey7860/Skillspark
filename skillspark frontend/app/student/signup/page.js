"use client"

import Signup from "@/components/student ui/Signup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


const page = () => {
  const dispatch = useDispatch();


  const router = useRouter();
  const { isAuthenticated } = useSelector(state => state.studentReducer)

  useEffect(() => {

    if (isAuthenticated) {
      router.push('/student/auth')
    }
  }, [isAuthenticated])


  return (
    <>
      <Signup />
    </>
  )
}

export default page


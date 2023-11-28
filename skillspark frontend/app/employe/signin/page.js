"use client"
// import Signin from "@/components/common/Signin";
import Signin from "@/components/employe ui/Signin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector(state => state.employeReducer)

  useEffect(() => {

    if (isAuthenticated) {
      router.push('/employe/auth')
    }
  }, [isAuthenticated])


  return (
    <>
      <Signin />
    </>
  )
}

export default page
"use client"

// import Footer from "@/components/common/Footer"
import Footer from "@/components/common/Footer"
import Navbar from "@/components/student ui/Navbar"
import { asyncCurrentStudent } from "@/store/Actions/studentAction"
import { removeerror } from "@/store/Reducers/studentReducer"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// export const metadata = {
//   title: 'Internshala | Student',
// };

const StudentLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated ,errors} = useSelector(state => state.studentReducer)
  

  useEffect(() => {

    dispatch(asyncCurrentStudent())
    
    if (isAuthenticated) {
      router.push('/student/auth')
    }
  }, [isAuthenticated])


  if (errors) {
    errors.map((error) => {
      if (error?.includes("Login first to access this resource")) {
        dispatch(removeerror())
        return;
      }
      toast.error(error);
      dispatch(removeerror())

    })

  }

  return (
    <>
      
      <Navbar/>

      {children}
      <Footer/>
    </>
  )
}

export default StudentLayout
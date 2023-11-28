"use client"

// import Footer from "@/components/employe ui/Footer"
import Footer from "@/components/common/Footer"
import Navbar from "@/components/employe ui/Navbar"
import { asyncCurrentemploye } from "@/store/Actions/employeAction"
import { removeerror } from "@/store/Reducers/employeReducer"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


// export const metadata = {
//   title: 'Internshala | Employe',
// }

const employeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated ,errors} = useSelector(state => state.employeReducer)
  

  useEffect(() => {

    dispatch(asyncCurrentemploye())
    
    if (isAuthenticated) {
      router.push('/employe/auth')
    }
  }, [isAuthenticated])

  if (errors) {
    errors.map((error) => {
      if (error.includes("Login first to access this resource")) {
        dispatch(removeerror())
        return;
      }
      toast.error(error);
      dispatch(removeerror())

    })

  }
  
  return (
    <>
      <Navbar />
      {children}
      <Footer/> 
    </>
  )
}

export default employeLayout
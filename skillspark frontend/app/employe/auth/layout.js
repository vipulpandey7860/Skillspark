"use client"


import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



// export const metadata = {
//   title: 'Employe | Home',
// };

const employeAuth = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
  const { isAuthenticated } = useSelector(state => state.employeReducer)
  

  useEffect(() => {

    if (!isAuthenticated) {
      router.push('/employe/')
    }

     }, [isAuthenticated])
  return (
    children
  )
}

export default employeAuth
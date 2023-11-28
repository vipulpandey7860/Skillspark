"use client"
import { ToastContainer, toast } from 'react-toastify';
import { store } from '@/store/store' 
import { Provider } from 'react-redux'
// import Navbar from '@/components/student ui/Navbar';
// import Footer from '@/components/student ui/Footer';
const Wrapper = ({ children }) => {
    return (

        <>
            <Provider store={store}>
                {/* <Navbar /> */}
                {children}
                {/* <Footer /> */}
                <ToastContainer />
            </Provider>
        </>
    )
}

export default Wrapper
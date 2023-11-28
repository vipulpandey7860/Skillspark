"use client"
import { asyncOTPPasswordStudent } from "@/store/Actions/studentAction";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const PasswordResetPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const {  errors } = useSelector(state => state.studentReducer)

  const sentotpHandler = async (e) => {
    
    e.preventDefault();
    const passwordData = {
      email: email,
      otp: otp,
      password: newPassword,
      confirmPassword: confirmPassword,
    };

    dispatch(asyncOTPPasswordStudent(passwordData));

    if (errors.length === 0) {
      router.push("/student/auth");
    }


  };

  const handlePasswordConfirmation = () => {
    setPasswordsMatch(newPassword === confirmPassword);
  };

  return (
    <div className="flex flex-col items-center p-5 justify-center min-h-screen bg-gray-100">
      <header className="mb-8 text-2xl font-semibold text-gray-700">
        Password Reset
      </header>
      <form className="w-full max-w-md">
        <div className="mb-5">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="otp" className="block text-lg font-medium text-gray-700">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="newPassword" className="block text-lg font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={handlePasswordConfirmation} 
            placeholder="Enter new password"
            className="mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={handlePasswordConfirmation} 
            placeholder="Confirm new password"
            className={`mt-2 px-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500 ${
              passwordsMatch ? 'text-gray-800' : 'text-red-600'
            }`}
            required
          />
          {!passwordsMatch && (
            <p className="text-red-600 mt-2">Passwords do not match.</p>
          )}
        </div>
       
        <button
          onClick={sentotpHandler}
          className="bg-red-900 text-white font-medium px-4 py-2 rounded-md hover:bg-red-800"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default PasswordResetPage;

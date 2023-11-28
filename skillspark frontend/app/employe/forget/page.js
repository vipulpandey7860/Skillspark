"use client"
import { asyncForgetPasswordemploye } from "@/store/Actions/employeAction";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const ForgetPasswordPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { errors } = useSelector((state) => state.employeReducer);
  const [email, setEmail] = useState("");

  const sendEmailHandler = async () => {
    const emailData = {
      email: email,
    };

    await dispatch(asyncForgetPasswordemploye(emailData));

    await router.push("/employe/forget/otp");

  };

  return (
    <div className="flex flex-col items-center py-20 text-center min-h-screen bg-gray-100">
      <header className="mb-8 text-2xl font-semibold text-gray-700">
        Enter email address to reset password
      </header>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 px-4 py-2 w-64 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          placeholder="Enter your email"
          required
        />
      </div>

      <button
        onClick={sendEmailHandler}
        className="bg-green-700 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600"
      >
        Send Email
      </button>
    </div>
  );
};

export default ForgetPasswordPage;

"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncorganizationLogoemploye,
  asyncResetPasswordemploye,
  asyncUpdateemploye,
} from '@/store/Actions/employeAction';



const EmployerProfilePage = () => {
  const dispatch = useDispatch();
  const { employe } = useSelector((state) => state.employeReducer);

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [formData, setFormData] = useState({
    firstname: employe ? employe.firstname : '',
    lastname: employe ? employe.lastname : '',
    organizationname: employe ? employe.organizationname : '',
    contact: employe ? employe.contact : '',
    city: employe ? employe.city : '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const employerUpdateHandler = () => {
    setIsEditing(!isEditing);
  };

  const togglePasswordChangeForm = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handleLogoClick = () => {
    if (isEditing) {
      document.getElementById('organizationLogoInput').click();
    }
  };

  const handleLogoHover = () => {
    setLogoHovered(true);
  };

  const handleLogoLeave = () => {
    setLogoHovered(false);
  };

  const organizationLogoHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('organizationlogo', e.target.files[0]);
    dispatch(asyncorganizationLogoemploye(formData));
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordMatchError('Password and confirm password do not match.');
      return;
    }

    setPasswordMatchError('');

    const newPasswordData = {
      password: formData.newPassword,
    };
    dispatch(asyncResetPasswordemploye(newPasswordData));
    setIsChangingPassword(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUpdateemploye(formData));
    setIsEditing(false);
  };

  return (
    <div className="py-8">
      <div
        className="bg-cover bg-center h-64 bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-500"
      >
         <div className="container mx-auto">
          <div className="w-full lg:w-7/12 pt-5 text-center">
            <h1 className="text-4xl text-white font-bold ">
              Hello, {employe?.firstname} {employe?.lastname}
            </h1>
            <p className="mt-3 mb-6 text-lg text-white">
              This is your profile page. You can see the details and change them accordingly.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row p-5 md:p-0">
        <div className="container border w-full  md:w-1/4 h-max mx-auto mt-5 p-5 rounded-lg shadow-md">
          <div className="w-full mx-auto">
            <div className="card card-profile ">
              <div className="flex justify-center">
                <div className="w-32 h-32  ">
                  <div
                    className={`card-profile-image cursor-pointer ${
                      isEditing && logoHovered ? 'hover:opacity-30 ' : ''
                    }`}
                    onClick={handleLogoClick}
                    onMouseEnter={handleLogoHover}
                    onMouseLeave={handleLogoLeave}
                  >
                    
                    <img
                      src={employe?.organizationlogo.url}
                      className="rounded-full"
                      alt="Profile Image"
                    />
                    {isEditing && logoHovered && (
                      <div className="mt-2">
                        <input
                          type="file"
                          id="organizationLogoInput"
                          className="hidden"
                          onChange={organizationLogoHandler}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-body pt-0 pt-md-4">
                <div className="text-center">
                  <h3 className="text-2xl capitalize pt-4 font-semibold">
                    {employe?.firstname} {employe?.lastname}
                  </h3>
                  <div className="text-lg mt-2">
                    <i className="ni location_pin capitalize ">{employe?.city}</i>
                  </div>
                </div>
              </div>
              <div className="card-header text-center pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={employerUpdateHandler}
                    className="bg-yellow-400 p-2 px-3 text-white font-semibold rounded-md"
                  >
                    Edit profile
                  </button>
                  <button
                    onClick={togglePasswordChangeForm}
                    className="bg-yellow-400 p-2 px-3 text-white font-semibold rounded-md"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-lg mt-5 w-full md:w-1/2 order-first xl:col-span-8 md:mx-10">
          <div className="bg-secondary shadow card">
            <div className="bg-white border-0 card-header">
              <div className="flex items-center justify-between p-5 ">
                <h3 className="mb-0 text-xl font-semibold">My Account</h3>
              </div>
            </div>
            <div className="card-body px-5 text-[#314362]">
              {isChangingPassword ? (
                <form onSubmit={resetPasswordHandler}>
                     <h6 className="text-gray-600 text-sm ">Change Password</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-4 md:py-10 py-5 border-b">
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-old-password" className="form-control-label">
                        Old Password
                      </label>
                      <input
                        type="password"
                        id="input-old-password"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="Old Password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-new-password" className="form-control-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="input-new-password"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-confirm-new-password" className="form-control-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="input-confirm-new-password"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="Confirm New Password"
                        name="confirmNewPassword"
                        value={formData.confirmNewPassword}
                        onChange={handleInputChange}
                        required
                      />
                      {passwordMatchError && (
                        <p className="text-red-600 mt-2">{passwordMatchError}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="p-2 bg-green-400 rounded-md m-5 text-white"
                  >
                    Change Password
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h6 className="text-gray-600 text-sm">User Information</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2  md:px-4 gap-4 md:py-10 py-5 border-b">
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-firstname" className="form-control-label">
                        First name
                      </label>
                      <input
                        type="text"
                        id="input-firstname"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-lastname" className="form-control-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="input-lastname"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-organizationname" className="form-control-label">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        id="input-organizationname"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="Organization Name"
                        name="organizationname"
                        value={formData.organizationname}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-contact" className="form-control-label">
                        Contact
                      </label>
                      <input
                        type="text"
                        id="input-contact"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="Contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-city" className="form-control-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="input-city"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'} p-2 border rounded-md shadow-md`}
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <button type="submit" className="p-2 bg-green-400 rounded-md m-5  text-white">
                      Save Changes
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;

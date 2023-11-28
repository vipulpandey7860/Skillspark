"use client"
import {
  asyncAvatarStudent,
  asyncResetPasswordStudent,
  asyncUpdateStudent,
} from "@/store/Actions/studentAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { student, isAuthenticated } = useSelector((state) => state.studentReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const [formData, setFormData] = useState({
    email: student ? student.email : "",
    firstname: student ? student.firstname : "",
    lastname: student ? student.lastname : "",
    address: student ? student.address : "",
    city: student ? student.city : "",
    aboutme: student ? student.aboutme : "",
    contact: student ? student.contact : "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordMatchError, setPasswordMatchError] = useState(""); // Added state for password match error

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/student/auth");
    }
  }, [isAuthenticated]);

  const studentUpdateHandler = () => {
    setIsEditing(!isEditing);
  };

  const togglePasswordChangeForm = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      document.getElementById("avatarInput").click();
    }
  };

  const handleAvatarHover = () => {
    setAvatarHovered(true);
  };

  const handleAvatarLeave = () => {
    setAvatarHovered(false);
  };

  const avatarHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("avatar", e.target.files[0]);
    dispatch(asyncAvatarStudent(formData));
  };

  const resetPasswordHandler = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordMatchError("Password and confirm password do not match.");
      return;
    }

    setPasswordMatchError(""); 

    const newPasswordData = {
      password: formData.newPassword,
    };
    dispatch(asyncResetPasswordStudent(newPasswordData));
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
    dispatch(asyncUpdateStudent(formData));
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
              Hello, {student && student.firstname} {student && student.lastname}
            </h1>
            <p className="mt-3 mb-6 text-lg text-white ">
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
                    className={`card-profile-image cursor-pointer ${isEditing && avatarHovered ? 'hover:opacity-30' : ''
                      }`}
                    onClick={handleAvatarClick}
                    onMouseEnter={handleAvatarHover}
                    onMouseLeave={handleAvatarLeave}
                  >
                    <img
                      src={student?.avatar.url || student?.avatar.fileID}
                      className="rounded-full"
                      alt="Profile Image"
                    />
                    {isEditing && avatarHovered && (
                      <div className="mt-2">
                        <input
                          type="file"
                          id="avatarInput"
                          className="hidden"
                          onChange={avatarHandler}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-body pt-0  pt-md-4">
                <div className="text-center">
                  <h3 className="text-2xl capitalize pt-4 font-semibold">
                    {student?.firstname} {student?.lastname}
                  </h3>
                  <div className="text-lg mt-2">
                    <i className="ni location_pin capitalize ">{student?.city}</i>
                  </div>
                </div>
              </div>
              <div className="card-header text-center pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={studentUpdateHandler}
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
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
                    className="p-2 bg-green-400 rounded-md  m-5 text-white"
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
                        placeholder="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-email" className="form-control-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="input-email"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
                        placeholder="jesse@example.com"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <h6 className="mb-4 text-gray-600 text-sm pt-5">Contact Information</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2  md:px-4 gap-4 md:py-10 py-5 border-b">
                    <div className="form-group flex flex-col gap-2">
                      <label htmlFor="input-address" className="form-control-label">
                        Address
                      </label>
                      <input
                        id="input-address"
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
                        placeholder="Home Address"
                        name="address"
                        value={formData.address}
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
                        placeholder="City"
                        name="city"
                        value={formData.city}
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
                        className={`form-input ${isEditing ? 'border' : 'bg-white'
                          } p-2 border rounded-md shadow-md`}
                        placeholder="Contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                      />
                    </div>
                  </div>
                  <h6 className="mb-4 text-gray-600 text-sm mt-5">About Me</h6>
                  <div className="form-group flex flex-col gap-2 p-5">
                    <label className="">About Me</label>
                    <textarea
                      rows="4"
                      className={`form-input ${isEditing ? 'border' : 'bg-white'
                        } p-2 border rounded-md shadow-md`}
                      placeholder="A few words about you ..."
                      name="aboutme"
                      value={formData.aboutme}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                    />
                  </div>
                  {isEditing && (
                    <button type="submit" className="p-2 bg-green-400 rounded-md mb-5 mx-5 text-white">
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

export default ProfilePage;

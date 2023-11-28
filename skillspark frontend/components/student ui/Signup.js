import { asyncSignupStudent } from "@/store/Actions/studentAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isAuthenticated) router.push("/student/auth");
  }, [isAuthenticated]);

  const signupHandler = (e) => {
    e.preventDefault();
    const newStudent = {
      email: email,
      password: password,
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      contact: contact,
      city: city,
      address: address,
    };

    dispatch(asyncSignupStudent(newStudent));
    
    if (isAuthenticated) {
      router.push('/student/auth');
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:p-10 lg:p-10 gap-5">
      <div
        className="w-full md:w-1/2 bg-cover bg-center p-5"
        style={{
          backgroundImage:
            'url("https://internshala.com/static/images/registration/student/background-768.png")',
        }}
      >
        <h1 className="text-4xl text-gray-800 font-semibold mb-1">
          A
          <span className="text-yellow-400"> free</span> ride to your dream career
        </h1>
        <p className="text-gray-800 text-lg">
          Register and apply to 10,000+ opportunities
        </p>
        <div className="flex flex-col mt-8">
          <div className="flex items-center gap-2">
            <img
              src="https://t3.ftcdn.net/jpg/03/38/92/74/240_F_338927425_ORe15ecNoxoWiV78YSdAQXXoHZzsNY4c.jpg"
              alt="Internships"
              className="w-8 h-8"
            />
            <h4 className="text-gray-800 text-md">Internships</h4>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://t3.ftcdn.net/jpg/03/38/92/74/240_F_338927425_ORe15ecNoxoWiV78YSdAQXXoHZzsNY4c.jpg"
              alt="Fresher Jobs"
              className="w-8 h-8"
            />
            <h4 className="text-gray-800 text-md">Fresher Jobs</h4>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://t3.ftcdn.net/jpg/03/38/92/74/240_F_338927425_ORe15ecNoxoWiV78YSdAQXXoHZzsNY4c.jpg"
              alt="Work from Home Jobs"
              className="w-8 h-8"
            />
            <h4 className="text-gray-800 text-md">Work from Home Jobs</h4>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white shadow-md md:ml-5 lg:ml-5 p-5 mt-2">
        <form>
          <p>Email</p>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-gray-700 mt-3">Password</p>
          <input
            type="password"
            placeholder="Must be at least 6 characters"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
          />
          <div className="flex mt-3">
            <div className="w-1/2 pr-2">
              <p>First Name</p>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-1/2 pl-2">
              <p>Last Name</p>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <p className="text-gray-700 mt-3">Gender</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <p className="text-gray-700 mt-3">Contact</p>
          <input
            type="number"
            placeholder="1234567890"
            max={9999999999}
            min={1000000000}
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-gray-700 mt-3">City</p>
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-gray-700 mt-3">Address</p>
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded px-2 focus:outline-none focus:border-blue-500"
          />
          <p className="text-gray-700 mt-3">
            By signing up, you agree to our{" "}
            <Link className="text-blue-400" href="#">
              Terms and Conditions
            </Link>
          </p>

          <button
            onClick={signupHandler}
            className="bg-blue-500 text-white font-normal px-4 py-2 rounded-md mt-3 hover:bg-blue-700"
          >
            Sign Up
          </button>
          <p className="mt-3">
            Already Registered?{" "}
            <Link className="text-blue-500" href="/student/signin">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

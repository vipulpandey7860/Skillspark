import React from 'react';
import Link from 'next/link';
import { FaGooglePlay, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#333333] px-6 text-white py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-1/4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Internship by Places</h3>
            <Link href="/">Internship in India</Link>
            <Link href="/">Internship in Delhi</Link>
            <Link href="/">Internship in Bangalore</Link>
            <Link href="/">Internship in Hyderabad</Link>
            <Link href="/">Internship in Mumbai</Link>
            <Link href="/">Internship in Chennai</Link>
            <Link href="/">Internship in Gurgaon</Link>
            <Link href="/">Internship in Kolkata</Link>
            <Link href="/">Virtual internship</Link>
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Internship by Stream</h3>
            <Link href="/">Computer Science Internship</Link>
            <Link href="/">Electronics Internship</Link>
            <Link href="/">Mechanical Internship</Link>
            <Link href="/">Civil Internship</Link>
            <Link href="/">Marketing Internship</Link>
            <Link href="/">Chemical Internship</Link>
            <Link href="/">Finance Internship</Link>
            <Link href="/">Summer Research Fellowship</Link>
            <Link href="/">Campus Ambassador Program</Link>
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold">
              Online Training <span className="offer bg-yellow-500 px-2 rounded-md text-white">OFFER</span>
            </h3>
            <Link href="/">Programming with Python</Link>
            <Link href="/">Digital Marketing</Link>
            <Link href="/">Web Development</Link>
            <Link href="/">Machine Learning</Link>
            <Link href="/">Advanced Excel</Link>
            <Link href="/">Ethical Hacking</Link>
            <Link href="/">AutoCAD</Link>
            <Link href="/">Creative Writing</Link>
            <Link href="/">Data Science</Link>
          </div>
          <div className="w-full md:w-1/4 flex flex-col gap-3">
            <h3 className="text-lg font-semibold">About Internshala</h3>
            <Link href="/">About Us</Link>
            <Link href="/">We're hiring</Link>
            <Link href="/">Hire interns for your company</Link>
            <Link href="/">Team Diary</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Our Services</Link>
            <Link href="/">Terms & Conditions</Link>
            <Link href="/">Privacy</Link>
            <Link href="/">Contact us</Link>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-white flex items-center gap-4 border border-solid p-3 rounded-md text-lg">
              <FaGooglePlay /> <span>Get Android App</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <FaInstagram style={{ width: '1.3vw' }} />
            <FaLinkedinIn style={{ width: '1.3vw' }} />
            <FaTwitter style={{ width: '1.3vw' }} />
            <FaYoutube style={{ width: '1.3vw' }} />
          </div>
          <span className="text-white font-semibold">&copy; Copyright 2023 Internshala</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

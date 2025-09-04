'use client'
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io5";
const Footer = () => {

  return (
    <footer className="bg-slate-900 text-white px-6 py-10 ">
      {/* Top Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 px-10 ">
        {/* Logo and Address */}
        <div className="flex flex-col justify-center items-center  w-1/4 ">
          <Image
            src="/logo.png"
            width={200}
            height={50}
            alt="Travories"
            className="h-18 w-auto"
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300">Chitwan, Nepal</p>
            <p className="text-sm text-gray-300">aadhar@gmail.com</p>
          </div>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <Link href="#" aria-label="Instagram">
             <IoLogoInstagram className="text-2xl text-gray-300 hover:text-white transition duration-200" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <IoLogoFacebook className="text-2xl text-gray-300 hover:text-white transition duration-200" />
            </Link>
            <Link href="#" aria-label="Twitter">
            <IoLogoTwitter className="text-2xl text-gray-300 hover:text-white transition duration-200" />
            </Link>
            <Link href="#" aria-label="YouTube">
             <IoLogoYoutube className="text-2xl text-gray-300 hover:text-white transition duration-200" />
            </Link>
          </div>
        </div>

        <div className='flex justify-between mt-6'>
          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-300 ">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 ">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 ">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-300 ">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 ">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/agentlogin" className="text-gray-300 ">
                  Medical Partners
                </Link>
              </li>
              <li>
                <Link href="/adminlogin" className="text-gray-300 ">
                  Admin
                </Link>
              </li>
              <li>

              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-400 my-8"></div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-400">
        © 2025 Aadhar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

'use client'; // Add this directive to mark as Client Component

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // Changed from next/router
import { FaRegUserCircle, FaHome, FaHandHoldingMedical, FaFileMedical, FaSmileBeam } from "react-icons/fa";

const LoginNavbar = () => {
  const pathname = usePathname(); // Replaces useRouter().pathname

  // Nav items data for cleaner code
  const navItems = [
    { href: "/userhome", icon: <FaHome />, text: "Home" },
    { href: "/bookings", icon: <FaHandHoldingMedical />, text: "Medical care" },
    { href: "/healthreport", icon: <FaFileMedical />, text: "Reports" },
    { href: "/recreational", icon: <FaSmileBeam />, text: "Recreational" }
  ];

  return (
    <nav className="w-full py-3 px-8 flex items-center justify-between bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center bg-transparent">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={50} 
            height={50} 
            className=" w-10 h-10  cursor-pointer rounded-full hover:opacity-90 transition-opacity" 
          />
          <span className="ml-2 text-xl font-bold text-green-600 hidden md:inline">Aadhar</span>
        </Link>
      </div>

      {/* Menu Items */}
      <div className="flex justify-around items-center space-x-6">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-colors ${
              pathname === item.href
                ? "bg-green-100 text-green-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100 font-medium"
            }`}
          >
            <span className={`text-lg ${
              pathname === item.href ? "text-green-600" : "text-gray-500"
            }`}>
              {item.icon}
            </span>
            <span>{item.text}</span>
          </Link>
        ))}
        <Link
          href="/profile"
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-colors ${
            pathname === "/userprofile"
              ? "bg-green-100 text-green-700 font-semibold"
              : "text-gray-600 hover:bg-gray-100 font-medium"
          }`}>
        <div className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors cursor-pointer">
          <FaRegUserCircle className='w-6 h-6'/>
        </div>
        </Link>
      </div>
    </nav>
  )
}

export default LoginNavbar
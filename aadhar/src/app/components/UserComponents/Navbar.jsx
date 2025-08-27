'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { FaHome } from 'react-icons/fa'

const Navbar = () => {
const token = Cookies.get('accessToken')
  return (
    <nav className="w-full py-2 px-8 flex items-center justify-between bg-white "  >
      {/* Logo */}
      <div className="flex items-center bg-transparent">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={50} 
            height={50} 
            className="cursor-pointer rounded-full" 
          />
        </Link>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        {token ? (
          <Link href="/userhome" passHref>
            <button className="bg-green-500 flex items-center justify-center' hover:bg-green-600 transition duration-200 text-white font-semibold px-6 py-2 rounded-full text-sm shadow-sm">
             <FaHome/> Home
            </button>
          </Link>
        ) : (<div className="flex items-center gap-3">
          
        <Link href="/userlogin" passHref>
          <button className="bg-green-500 hover:bg-green-600 transition duration-200 text-white font-semibold px-6 py-2 rounded-full text-sm shadow-sm">
            Login
          </button>
        </Link>
        <Link href="/usersignup" passHref>
          <button className="bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 transition duration-200 font-semibold px-6 py-2 rounded-full text-sm shadow-sm">
            Signup
          </button>
        </Link>
        </div>)}
      </div>
    </nav>
  )
}

export default Navbar

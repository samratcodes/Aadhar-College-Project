'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiLogIn, FiUserPlus, FiLayout } from 'react-icons/fi'

const Navbar = () => {
  const token = Cookies.get('accessToken')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  // Nav links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/aboutus' },
    { name: 'Services', href: '/service' },
  ]

  return (
    <nav className="w-[90%] mt-4 fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 rounded-4xl backdrop-blur-md border border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={45}
              height={45}
              className="cursor-pointer rounded-full shadow-sm hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative group transition ${
                  isActive ? 'text-green-600' : 'hover:text-green-600'
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-green-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            )
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {token ? (
            <Link href="/userhome" passHref>
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition duration-200 text-white font-semibold px-5 py-2 rounded-full text-sm shadow-md">
                <FiLayout className="text-white text-lg" />
                Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link href="/userlogin" passHref>
                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition duration-200 text-white font-semibold px-5 py-2 rounded-full text-sm shadow-md">
                  <FiLogIn className="text-white text-lg" />
                  Login
                </button>
              </Link>
              <Link href="/usersignup" passHref>
                <button className="flex items-center gap-2 bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 transition duration-200 font-semibold px-5 py-2 rounded-full text-sm shadow-md">
                  <FiUserPlus className="text-green-600 text-lg" />
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-gray-700 text-2xl" />
            ) : (
              <FiMenu className="text-gray-700 text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 rounded-b-3xl shadow-lg backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition ${
                    isActive ? 'text-green-600 font-semibold' : 'hover:text-green-600'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-green-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  ></span>
                </Link>
              )
            })}

            {token ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm shadow-md transition"
                onClick={() => setMenuOpen(false)}
              >
                <FiLayout className="text-white text-lg" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/userlogin"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm shadow-md transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiLogIn className="text-white text-lg" />
                  Login
                </Link>
                <Link
                  href="/usersignup"
                  className="flex items-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-50 px-5 py-2 rounded-full text-sm shadow-md transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiUserPlus className="text-green-600 text-lg" />
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

'use client'
import Link from 'next/link'
import React from 'react'

const BecomeMedicalPartner = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10 lg:px-20 border-b border-gray-200">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mb-4 text-sm font-medium">
          Partner With Us
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Become a <span className="text-green-600">Medical Partner</span>
        </h1>

        <p className="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
          We're inviting <strong>caretakers, nurses, and doctors</strong> to join our healthcare network.
        </p>

        <p className="text-md text-gray-500 mb-8 max-w-xl mx-auto">
          Deliver quality care and expand your reach by becoming part of our trusted medical community.
        </p>
        <Link href="/agentsignup" className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full text-lg transition-colors duration-300 mb-4 inline-block">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full text-lg transition-colors duration-300">
          Become a Medical Partner
        </button>
        </Link>
      </div>
    </section>
  )
}

export default BecomeMedicalPartner

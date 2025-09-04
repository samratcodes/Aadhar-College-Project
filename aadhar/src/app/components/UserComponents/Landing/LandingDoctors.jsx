'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { motion } from 'framer-motion'
import DoctorCard from '@/app/components/UserComponents/DoctorCard'

const LandingDoctors = () => {
  const [fetchedData, setFetchedData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState('default')
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const token = Cookies.get('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}api/user/doctors/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setFetchedData(data.data || [])
      } catch (error) {
        console.error('Error fetching doctors:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [API_URL, token])

  const sortedData = [...fetchedData].sort((a, b) => {
    switch (sortOption) {
      case 'price-low':
        return (a.pricePerHour || 0) - (b.pricePerHour || 0)
      case 'price-high':
        return (b.pricePerHour || 0) - (a.pricePerHour || 0)
      case 'rating':
        return (b.rating || 0) - (a.rating || 0)
      case 'experience':
        return (b.experience || 0) - (a.experience || 0)
      default:
        return 0
    }
  })

  return (
    <section className="py-16 px-6 bg-white relative">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto"
      >
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
          Meet Our <span className="text-green-600">Care Experts</span>
        </h2>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Our doctors, nurses, and caretakers are here to provide compassionate
          and professional care for your loved ones.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mx-auto">
        {sortedData.slice(0, 4).map((person, index) => (
            <DoctorCard key={index} doctor={person} />
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 mt-10"
        >
          Loading...
        </motion.div>
      )}
    </section>
  )
}

export default LandingDoctors
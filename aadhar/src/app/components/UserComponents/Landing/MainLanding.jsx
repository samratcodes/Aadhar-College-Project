'use client'
import React from 'react'
import { motion } from 'framer-motion'

const MainLanding = () => {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5790714/pexels-photo-5790714.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-start p-8 sm:pl-16 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col gap-6 max-w-xl"
          >
            {/* Title */}
            <div className="flex items-center gap-4">
              <div className="bg-[#009C65] w-2 h-16 sm:h-24"></div>
              <h1 className="text-white text-3xl sm:text-5xl font-bold leading-tight">
                <p>Aadhar Care</p>
                <p className="">Ageing is a Blessing</p>
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white text-sm sm:text-lg leading-relaxed"
            >
              Compassionate elderly care that nurtures dignity, comfort, and
              well-being. At <span className="font-semibold text-[#00D08E]">Aadhar</span>,
              we’re here to support every stage of life with warmth and respect.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

export default MainLanding

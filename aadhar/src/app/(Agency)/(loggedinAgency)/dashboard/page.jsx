'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Cookies from 'js-cookie'

import DashboardDrtable from '@/app/components/AdminComponents/DashboardDrtable';
import DashboardgraphAd from '@/app/components/AdminComponents/DashboardgraphAd';
import DashboardTransaction from '@/app/components/AdminComponents/DashboardTransaction';
import React from 'react'
import { FcRating } from "react-icons/fc";
import { HiCurrencyDollar } from "react-icons/hi";
import { FaUsers , FaBookmark  } from "react-icons/fa";
import { MdOutlineVerified ,MdDashboard} from "react-icons/md";

const page = () => {
  const [profile, setProfile] = useState(null)
  const [appointments, setAppointments] = useState([])

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  
  useEffect(() => {
    const fetchProfile = async () => {
      const storedToken = Cookies.get('docsAccessToken')
      console.log('Token from cookie:', storedToken)

      if (!storedToken) {
        console.error('No token found in cookies')
        return
      }

      try {
        const res = await axios.get(`${API_URL}api/doctor/profile`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        console.log('Fetched profile:', res.data)
        setProfile(res.data.doctor)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    const fetchAppointments = async () => {
      const storedToken = Cookies.get('docsAccessToken')
      console.log('Token from cookie:', storedToken)

      if (!storedToken) {
        console.error('No token found in cookies')
        return
      }

      try {
        const res = await axios.get(`${API_URL}api/doctor/appointments`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        console.log('Fetched appointments:', res.data)
        setAppointments(res.data.data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchProfile()
    fetchAppointments()
  }, [API_URL])

  const headerPackageManagement = [
    { title: 'Total Patient Checked', count: 20, icon: <FaUsers className=' w-10 h-10' />, Bottomtext: 'Since Last Month' },
    { title: 'Total Earning', count: '2000', icon: <HiCurrencyDollar className=' w-10 h-10' />, Bottomtext: 'Since Last Month' },
    { title: 'Ratings', count: profile?.rating ?? 2.5, icon: <FcRating className=' w-10 h-10' />, Bottomtext: 'out of 5' },
  ]

  const pendingAppointments = appointments.filter(item => item.status === 'pending')

  return (
    <div className='p-4 w-full h-full bg-gray-100'>
      <h1 className=' flex font-semibold items-center justify-start  text-2xl text-green-600 '>
        <MdDashboard className='text-3xl mr-4' />
        Dashboard
      </h1>

      <div className="flex flex-wrap w-full justify-start gap-4">
        {headerPackageManagement.map((item, index) => (
          <section key={index} className="flex overflow-hidden flex-col justify-center my-2 px-1 py-2 bg-green-50 rounded-xl w-[285px]">
            <div className="flex flex-col justify-center w-full px-2">
              <div className="flex gap-3 justify-center items-center  w-full">
                <div className="flex flex-col justify-center self-stretch pl-1 my-auto border-l-4 border-green-500 w-[225px]">
                  <h2 className="text-base text-slate-500">{item.title}</h2>
                  <p className="text-2xl font-semibold text-black">{item.count}</p>
                </div>
                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch text-green-700 rounded-lg bg-LoginCustom bg-opacity-20 h-[60px]  w-[80px]">
                  {item.icon}
                </div>
              </div>
              <div className="flex gap-2.5 justify-center items-center self-start mt-3 text-xs">
                <div className="flex gap-0.5 justify-center items-center self-stretch my-auto text-green-500">
                  <span>+ </span>
                </div>
                <p className="self-stretch my-auto text-slate-500">{item.Bottomtext}</p>
              </div>
            </div>
          </section>
        ))}
      </div>


      {/* Pending Verification Requests Section */}
      <div className="mt-10 rounded-lg bg-white p-6">
        <h1 className="text-2xl font-bold text-green-500 mb-4">Pending Verification Requests</h1>
        <div className="grid grid-cols-5 font-semibold p-2 rounded-t-md bg-gray-100">
          <div>S.N.</div>
          <div>Name</div>
          <div>Description</div>
          <div>Date</div>
          <div>Address</div>
        </div>
        {pendingAppointments.length === 0 ? (
          <div className="text-gray-500 p-4">No pending appointments to display.</div>
        ) : (
          pendingAppointments.map((item, index) => (
            <button key={index} className="grid grid-cols-5 border-t border-gray-300 p-2 items-center">
              <div>{index + 1}</div>
              <div>{item.patientName}</div>
              <div>{item.description}</div>
              <div>{new Date(item.dateOfAppointment).toLocaleDateString('en-CA')}</div>
              <div>{item.address}</div>
            </button>
          ))
        )}
      </div>

      <div className='flex gap-4 w-full'>
        <DashboardTransaction />
      </div>
      <DashboardgraphAd />
    </div>
  )
}

export default page

import React from 'react'
import {FaHandHoldingMedical} from "react-icons/fa";
import DoctorCard from './DoctorCard';
const RecommendedDoctors = ({data}) => {
  console.log(data.topThreeNurses,data.topThreeCareTakers,data.topThreeDoctors)
  return (
     <div className='w-full bg-white rounded-lg shadow-sm mx-4 mt-4 p-6'>
          <span className="text-2xl mt-10 font-bold text-green-600">
          <FaHandHoldingMedical className='inline-block mr-2'/>
         Recommended Doctors
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
         {data.topThreeDoctors.map((doctor,index) => (
     <DoctorCard key={index} doctor={doctor} />
         ))}
         </div>
        </span>
        <span className="text-2xl  font-bold text-green-600">
        <h1 className='my-10 flex items-center'>  <FaHandHoldingMedical className=' mr-2'/>
        Recommended Caretakers</h1>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
         {data.topThreeCareTakers.map((doctor,index) => (
     <DoctorCard key={index} doctor={doctor} />
         ))}
         </div>
        </span>
        <span className="text-2xl my-10 font-bold text-green-600">
        <h1 className='my-10 flex items-center'>   <FaHandHoldingMedical className='inline-block mr-2'/>
         Recommended Nurses </h1>
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
         {data.topThreeNurses.map((doctor,index) => (
     <DoctorCard key={index} doctor={doctor} />
         ))}
         </div>
        </span>
    </div>
  )
}

export default RecommendedDoctors

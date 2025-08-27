import React from 'react'
import Image from 'next/image'
import { MdOutlineGroups2 } from "react-icons/md";
const HomeRecreational = ({data}) => {
  console.log(data)
  return (
    <div className='w-full bg-white rounded-lg shadow-sm mx-4 mt-4 p-6'>
      <span className="text-2xl font-bold text-green-600">
                          <MdOutlineGroups2 className='inline-block mr-2'/>
                          Recreational Activities
                        </span>
      <div className='space-y-4'>
        {data.slice(0,4).map((activity) => (
          <div 
            key={activity.id} 
            className='flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow'
          >
            <div className='relative w-24 h-20 flex-shrink-0'>
            <Image
  src={activity.images[0]}
  alt={activity.title}
  width={96}
  height={80}
  className='rounded-lg object-cover'
/>

            </div>
            <div className='flex-1'>
              <h2 className='text-lg font-semibold text-gray-800'>
                {activity.title.slice(0,20)}</h2>
              <p className='text-sm text-gray-500 mt-1 line-clamp-2'>{activity.description.slice(0,20)}</p>
              <div className='flex items-center mt-2 text-sm text-gray-600'>
                <span>{activity.tentativeDate}</span>
                <span className='mx-2'>•</span>
                <span>${activity.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeRecreational
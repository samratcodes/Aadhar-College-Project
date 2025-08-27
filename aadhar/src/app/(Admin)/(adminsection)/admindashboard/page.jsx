import DashboardDrtable from '@/app/components/AdminComponents/DashboardDrtable';
import DashboardgraphAd from '@/app/components/AdminComponents/DashboardgraphAd';
import DashboardTransaction from '@/app/components/AdminComponents/DashboardTransaction';
import React from 'react'
import { FaUsers , FaBookmark  } from "react-icons/fa";
import { MdOutlineVerified ,MdDashboard} from "react-icons/md";
const page = () => {
    const headerPackageManagement =[
      { title: 'Total users', count: 20, icon:  <FaUsers className=' w-10 h-10'/> , Bottomtext:'Added Last Month'},
      { title: 'Total Appointments', count: '900', icon:<FaBookmark className=' w-10 h-10'/>, Bottomtext:'Since Last Month' },
      { title: 'Verified meds', count:'40', icon:<MdOutlineVerified className=' w-10 h-10'/>, Bottomtext:'Since Last Week' },
  ]
  return (
    <div className='p-4 w-full h-full bg-gray-100'>
      <h1 className=' flex font-semibold items-center justify-start  text-2xl text-green-600 '>
        <MdDashboard  className='text-3xl mr-4' />
        Dashboard</h1>
            <div className="flex flex-wrap w-full justify-start gap-4">
              {headerPackageManagement.map((item, index) => (
          <section key={index} className="flex overflow-hidden flex-col justify-center my-2 px-1 py-2 bg-green-50 rounded-xl w-[285px]">
          <div className="flex flex-col justify-center w-full px-2">
            {/* Main Stats Section */}
            <div className="flex gap-3 justify-center items-center  w-full">
              {/* Total Packages Section */}
              <div className="flex flex-col justify-center self-stretch pl-1 my-auto border-l-4 border-green-500 w-[225px]">
                <h2 className="text-base text-slate-500">{item.title}</h2>
                <p className="text-2xl font-semibold text-black">{item.count}</p>
              </div>
              {/* Icon Section */}
              <div className="flex overflow-hidden flex-col justify-center items-center self-stretch text-green-700 rounded-lg bg-LoginCustom bg-opacity-20 h-[60px]  w-[80px]">
                  {item.icon}
              </div>
            </div>
      
            {/* Added Last Month Section */}
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
            <div className='flex  gap-4 w-full'>
              <DashboardDrtable/>
              <DashboardTransaction/>
            </div>
            <DashboardgraphAd/>



    </div>
  )
}

export default page

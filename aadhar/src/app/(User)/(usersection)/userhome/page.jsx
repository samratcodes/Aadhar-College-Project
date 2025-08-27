'use client'
import HomeRecreational from '@/app/components/UserComponents/HomeRecreational'
import RecommendedDoctors from '@/app/components/UserComponents/RecommendedDoctors'
import Reportgraph from '@/app/components/UserComponents/Reportgraph'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const page = () => {
   const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get('accessToken');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          console.log("Full URL:", `${API_URL}api/user/dashboard/`);
          console.log("Token:", token);
          const response = await fetch(`${API_URL}api/user/dashboard/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          
          const data = await response.json();
          console.log(data)
          setFetchedData(data );
          console.log(data)
        } catch (error) {
          console.error('Error fetching report:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }
  
  return (
    <div className=' bg-gray-100'>
      <div className='flex '>
      <div className='flex flex-col items-center  p-4 w-3/4 h-full bg-gray-100'>
      <Reportgraph data={fetchedData.vitalReports}/>
      </div>
      <div className='flex flex-col items-center  w-1/4 h-full bg-gray-100'>
      <HomeRecreational data={fetchedData.topFiveActivities}/>
      </div>
      </div>
      <div className=' px-8 bg-gray-100 rounded-lg shadow-md mt-2'>
        <RecommendedDoctors data={fetchedData}/>
      </div>
    </div>
  )
}

export default page

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdDashboard, MdOutlineMessage, MdOutlinePieChart } from 'react-icons/md';
import { TfiAgenda } from 'react-icons/tfi';
import { BsGraphUp, BsFlag } from 'react-icons/bs';
import { FaBoxOpen } from 'react-icons/fa';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi';
import { FaPlus } from "react-icons/fa";
const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const Menu = [
    { name: 'Dashboard', link: '/admindashboard', icon: <MdDashboard /> },
    { name: 'Dr.verify', link: '/doctorverify', icon: <TfiAgenda /> },
    { name: 'Transaction Verify', link: '/transaction', icon: <BsGraphUp /> },
    { name: 'Recreational ', link: '/createrecreational', icon: <FaPlus /> },
  ];

  const Others = [
    { name: 'Help Center', link: '#', icon: <RiQuestionnaireLine /> },
    { name: 'Report', link: '#', icon: <BsFlag /> },
    { name: 'Settings', link: '/setting', icon: <FiSettings /> },
  ];

  const handleLogout = () => {
    // logic here
  };

  const renderLink = (item, idx) => (
    <Link href={item.link} key={idx}>
      <li
        className={`group flex items-center gap-4 text-gray-700 hover:text-green-600 transition-all px-4 py-2 rounded-lg cursor-pointer ${
          pathname.startsWith(item.link) ? 'bg-green-100 text-green-700 font-semibold' : ''
        } ${isCollapsed ? 'justify-center' : ''}`}
      >
        <span className="text-xl">{item.icon}</span>
        {!isCollapsed && <span className="text-sm">{item.name}</span>}
      </li>
    </Link>
  );

  return (
    <aside className={`bg-white shadow-md h-screen sticky top-0 flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} px-2`}>
      {/* Top: Toggle + Logo */}
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center px-2 pt-3">
          <button onClick={toggleSidebar} className="text-2xl text-gray-600 hover:text-black">
            <HiOutlineMenuAlt3 />
          </button>
        </div>

        <div className="flex items-center gap-2 px-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full" />
          {!isCollapsed && <span className="text-lg font-bold text-green-600">Aadhar</span>}
        </div>

        <ul className="flex flex-col gap-1 mt-4">
          {Menu.map(renderLink)}
        </ul>

        <div className="border-t border-gray-300 my-4" />

        <ul className="flex flex-col gap-1">
          {Others.map(renderLink)}
        </ul>
      </div>

      {/* Bottom: Logout */}
      <div className="w-full pb-4">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 text-red-500 font-medium hover:text-red-600 px-4 py-2 rounded-lg transition-all w-full ${isCollapsed ? 'justify-center' : ''}`}
        >
          <span className="text-xl">⎋</span>
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

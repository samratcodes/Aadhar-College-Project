'use client';
import Navbar from './components/UserComponents/Navbar';
import Footer from './components/UserComponents/Footer';
import BecomeMedicalPartner from './components/UserComponents/BecomeMedicalPartner';
import LandingRecreational from './components/UserComponents/LandingRecreational';
export default function Home() {
  return (
    <div>
    <div
     className="relative w-full  bg-cover bg-center"
    style={{ backgroundImage: `url(https://images.pexels.com/photos/7551686/pexels-photo-7551686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }} >
      <Navbar/>
    <main className="w-full">
      {/* Hero Section */}
      <div
        className="relative w-full h-screen bg-cover bg-center"
      >
        <div className="absolute inset-0 flex items-center justify-start p-8 sm:pl-16 sm:pb-28 bg-black/30">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="flex items-center gap-4">
              <div className="bg-[#009C65] w-2 h-12 sm:h-24"></div>
              <div className="text-white text-2xl sm:text-4xl font-bold leading-tight">
                <p>A place where</p>
                <p>"AGEING IS A BLESSING"</p>
              </div>
            </div>
            <p className="text-white text-sm sm:text-md">
              HHEC is staffed by geriatric trained professionals that offer full
              range of services to elderly ensuring their physical, mental and
              psychological well-being.
            </p>
          </div>
        </div>
      </div>
    </main>

    </div>
    <BecomeMedicalPartner/>
    <LandingRecreational/>

    <Footer/>
    </div>
  );
}

'use client';
import Navbar from './components/UserComponents/Landing/Navbar';
import Footer from './components/UserComponents/Footer';
import BecomeMedicalPartner from './components/UserComponents/Landing/BecomeMedicalPartner';
import LandingRecreational from './components/UserComponents/Landing/LandingRecreational';
import MainLanding from './components/UserComponents/Landing/MainLanding';
import Servicessection from './components/UserComponents/Landing/Servicessection';
import LandingDoctors from './components/UserComponents/Landing/LandingDoctors';
export default function Home() {
  return (
    <div>

        <Navbar/>
     <MainLanding/>
     <LandingDoctors/>
     <Servicessection/>
    <LandingRecreational/>
    <BecomeMedicalPartner/>
    <Footer/>
    </div>
  );
}

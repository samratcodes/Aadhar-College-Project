import Footer from "@/app/components/UserComponents/Footer";
import Navbar from "@/app/components/UserComponents/Navbar";
import { Metadata } from "next";


export const metadata = {
  title: "Aadhar",
  description: "Login to your account",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({
  children,
}) {
  return (
      <div className="bg-gray-10 w-full">
        <Navbar/>
         {children}
         <Footer/>  
         </div>
  );
}

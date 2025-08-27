import LoginNavbar from "@/app/components/UserComponents/LoginNavbar";


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
        <LoginNavbar/>
         {children} 
         </div>
  );
}

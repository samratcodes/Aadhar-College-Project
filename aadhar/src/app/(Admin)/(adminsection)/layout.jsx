import AdminSidebar from "@/app/components/AdminComponents/AdminSidebar";

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
      <div className="bg-gray-10 w-full flex">
        <AdminSidebar/>
         {children} 
         </div>
  );
}

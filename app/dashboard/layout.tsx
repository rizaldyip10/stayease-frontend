import { ReactNode } from "react";
import Sidebar from "@/app/dashboard/_components/Sidebar";
import Navbar from "@/app/dashboard/_components/Navbar";
import ProtectedRoute from "@/components/hoc/ProtectedRoute";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    // <ProtectedRoute>
    <main className="w-full flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="lg:ml-64 relative flex flex-col w-full bg-[#FAFAFA]">
        <Navbar />
        <div className="w-full p-3 md:p-7">{children}</div>
      </div>
    </main>
    // </ProtectedRoute>
  );
};

export default DashboardLayout;

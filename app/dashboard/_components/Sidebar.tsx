import logo from "@/assets/images/logo_horizontal.png";
import Image from "next/image";
import SidebarRoutes from "@/app/dashboard/_components/SidebarRoutes";

const Sidebar = () => {
    return (
        <div className="w-64 fixed hidden lg:flex flex-col px-6 py-10 gap-2 bg-white h-screen border-r border-gray-200 z-50">
            <div className="w-full flex justify-center">
                <Image src={logo} alt="logo" height={35} />
            </div>
            <SidebarRoutes />
        </div>
    );
};

export default Sidebar;
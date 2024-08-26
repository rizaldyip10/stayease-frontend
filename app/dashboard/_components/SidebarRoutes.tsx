"use client";

import {useRouter} from "next/navigation";
import {adminRoutes as routes} from "@/constants/Routes";
import SidebarItems from "@/app/dashboard/_components/SidebarItems";

const SidebarRoutes = () => {
    const router = useRouter();
    return (
        <div className="w-full h-full items-start flex flex-col gap-3 mt-10">
            {
                routes.map((route, i) => (
                    <SidebarItems key={i} route={route} onClick={() => router.push(route.href)} />
                ))
            }
        </div>
    );
};

export default SidebarRoutes;
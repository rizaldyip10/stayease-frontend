"use client";

import {userMenuRoutes as routes} from "@/constants/Routes";
import {useRouter} from "next/navigation";
import MenuItems from "@/app/(user)/profile/_components/MenuItems";

const MenuRoutes = () => {
    const router = useRouter();
    return (
        <div className="w-full flex flex-col gap-3 mt-2">
            {
                routes.map((route, i) => (
                    <MenuItems route={route} onClick={() => router.push(route.href)} key={i} />
                ))
            }
        </div>
    );
};

export default MenuRoutes;
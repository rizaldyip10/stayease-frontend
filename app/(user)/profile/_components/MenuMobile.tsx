"use client";

import { userMenuRoutes as routes } from "@/constants/Routes";
import { useRouter } from "next/navigation";
import MenuItems from "@/app/(user)/profile/_components/MenuItems";
import { FC } from "react";
import { cn } from "@/lib/utils";

interface MenuMobileProps {
  isOpen: boolean;
}

const MenuMobile: FC<MenuMobileProps> = ({ isOpen }) => {
    const router = useRouter();

    return (
        <div className={cn("w-full flex-col gap-1 bg-white",
                isOpen ? "flex" : "hidden"
            )}
        >
            {
                routes.map((route, index) => (
                    <MenuItems route={route} key={index} onClick={() => router.push(route.href)} />
                ))
            }
        </div>
    );
};

export default MenuMobile;
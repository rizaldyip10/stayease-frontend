"use client";

import {Button} from "@/components/ui/button";
import {RouteType} from "@/constants/Routes";
import {FC} from "react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

interface NavItemsProps {
    route: RouteType;
    onClick?: () => void;
}

const NavItems: FC<NavItemsProps> = ({ route, onClick }) => {
    const pathname = usePathname();
    const { label, href } = route;

    const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`)
    return (
        <Button
            variant="link"
            type="button"
            className={cn("text-blue-950", isActive ? "font-bold" : "font-normal")}
            onClick={onClick}
        >
            { label }
        </Button>
    );
};

export default NavItems;
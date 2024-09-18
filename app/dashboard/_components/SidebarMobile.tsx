"use client";

import {Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {adminRoutes as routes} from "@/constants/Routes";
import {useRouter} from "next/navigation";
import SidebarItems from "@/app/dashboard/_components/SidebarItems";

const SidebarMobile = () => {
    const router = useRouter();
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden">
                <Menu className="w-4 h-4 text-blue-950" />
            </SheetTrigger>
            <SheetContent side="left" className="w-full md:w-1/2 bg-white flex flex-col pt-14">
                <SheetTitle className="hidden"></SheetTitle>
                <SheetDescription className="hidden"></SheetDescription>
                {
                    routes.map((route, i) => (
                        <SheetClose asChild key={i}>
                            <SidebarItems route={route} onClick={() => router.push(route.href)} />
                        </SheetClose>
                    ))
                }
            </SheetContent>
        </Sheet>
    );
};

export default SidebarMobile;
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { routes } from "@/constants/Routes";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileMenu = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Sheet>
            <SheetTrigger asChild className="lg:hidden">
                <Menu className="w-4 h-4 text-blue-950" />
            </SheetTrigger>
            <SheetContent side="left" className="w-full md:w-1/2 bg-white flex flex-col pt-14">
                <SheetTitle>Menu</SheetTitle>
                {
                    routes.map((route, i) => {
                        const { label, href } = route;
                        const isActive = (pathname === "/" && href === "/") || pathname === href || pathname?.startsWith(`${href}/`);

                        return (
                            <SheetClose
                                key={i}
                                className={cn("text-blue-950", isActive ? "font-bold" : "font-normal")}
                                onClick={() => router.push(href)}
                            >
                                { label }
                            </SheetClose>
                        )
                    })
                }
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;
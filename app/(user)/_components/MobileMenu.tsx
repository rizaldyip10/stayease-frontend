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
import { useRouter } from "next/navigation";
import NavItems from "@/app/(user)/_components/NavItems";

const MobileMenu = () => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="w-4 h-4 text-appblue-900 text-center" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full md:w-1/2 bg-white flex flex-col pt-14"
      >
        <SheetTitle>Menu</SheetTitle>
        {routes.map((route, i) => (
          <SheetClose key={i}>
            <NavItems route={route} onClick={() => router.push(route.href)} />
          </SheetClose>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

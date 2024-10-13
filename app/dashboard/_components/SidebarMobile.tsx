"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import SidebarItems from "@/app/dashboard/_components/SidebarItems";
import { useSession } from "next-auth/react";
import { adminRoutes, userMenuRoutes } from "@/constants/Routes";

const SidebarMobile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  let routes;
  if (session?.user?.userType === "TENANT") {
    routes = adminRoutes;
  } else {
    routes = userMenuRoutes;
  }
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="w-4 h-4 text-blue-950" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full md:w-1/2 bg-white flex flex-col pt-14"
      >
        <SheetTitle className="hidden"></SheetTitle>
        <SheetDescription className="hidden"></SheetDescription>
        {routes.map((route, i) => (
          <SheetClose asChild key={i}>
            <SidebarItems
              route={route}
              onClick={() => router.push(route.href)}
            />
          </SheetClose>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;

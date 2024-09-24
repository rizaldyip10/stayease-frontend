"use client";

import { useRouter } from "next/navigation";
import SidebarItems from "@/app/dashboard/_components/SidebarItems";
import { useSession } from "next-auth/react";
import { adminRoutes, userMenuRoutes } from "@/constants/Routes";

const SidebarRoutes = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const isUser = session?.user?.userType === "USER";
  let routes;
  if (session?.user?.userType === "TENANT") {
    routes = adminRoutes;
  } else {
    routes = userMenuRoutes;
  }

  return (
    <div className="w-full h-full items-start flex flex-col gap-3 mt-10">
      {routes.map((route, i) => (
        <SidebarItems
          key={i}
          route={route}
          onClick={() => router.push(route.href)}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;

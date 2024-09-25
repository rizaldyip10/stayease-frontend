"use client";

import { useRouter } from "next/navigation";
import MenuItems from "@/app/(user)/profile/_components/MenuItems";
import { useSession } from "next-auth/react";
import { adminRoutes, userMenuRoutes } from "@/constants/Routes";

const MenuRoutes = () => {
  const router = useRouter();
  const { data: session } = useSession();
  let routes =
    session?.user?.userType === "USER" ? userMenuRoutes : adminRoutes;

  return (
    <div className="w-full flex flex-col gap-3 mt-2">
      {routes.map((route, i) => (
        <MenuItems
          route={route}
          onClick={() => router.push(route.href)}
          key={i}
        />
      ))}
    </div>
  );
};

export default MenuRoutes;

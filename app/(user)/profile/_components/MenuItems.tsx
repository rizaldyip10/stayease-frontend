"use client";

import { SidebarRoutesType, userMenuRoutes } from "@/constants/Routes";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MenuItemsProps {
  route: SidebarRoutesType;
  onClick?: () => void;
}

const MenuItems: FC<MenuItemsProps> = ({ route, onClick }) => {
  const pathname = usePathname();
  const { label, href, icon: Icon } = route;

  const currPath = pathname.replace("/profile", "");
  const isActive = pathname === href || currPath.startsWith(href);

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "flex w-full justify-start items-center gap-2 text-sm pl-3 bg-white text-blue-950",
        isActive ? "font-semibold bg-blue-950 text-white group" : "",
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4",
          isActive ? "text-white group-hover:text-blue-950" : "text-blue-950",
        )}
      />
      {label}
    </Button>
  );
};

export default MenuItems;

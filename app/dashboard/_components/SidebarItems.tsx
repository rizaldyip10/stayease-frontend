"use client";

import { SidebarRoutesType } from "@/constants/Routes";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItemsProps {
  route: SidebarRoutesType;
  onClick?: () => void;
}

const SidebarItems: FC<SidebarItemsProps> = ({ route, onClick }) => {
  const pathname = usePathname();
  const { label, href, icon: Icon } = route;

  const subRoute = pathname.replace(/(\/[^\/]+\/[^\/]+).*/, "$1");
  const isActive = pathname === href || subRoute === href;

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "flex w-full justify-start items-center gap-2 text-sm pl-6 bg-white text-blue-950",
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

export default SidebarItems;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import MenuMobile from "@/app/(user)/profile/_components/MenuMobile";

const MenuMobileBtn = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const label = (() => {
    switch (true) {
      case pathname === "/dashboard" || pathname.includes("/dashboard"):
        return "Dashboard";
      case pathname === "/profile/settings" ||
        pathname.includes("/profile/settings/"):
        return "Settings";
      case pathname === "/profile/bookings" ||
        pathname.includes("/profile/bookings/"):
        return "My Booking";
      case pathname === "/profile/reviews" ||
        pathname.includes("/profile/reviews/"):
        return "My Reviews";
      default:
        return "Profile";
    }
  })();

  return (
    <>
      <Button
        className="w-full flex items-center gap-2 justify-start"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AlignLeft className="w-3 h-3" />
        <p>{label}</p>
      </Button>

      <MenuMobile isOpen={isOpen} />
    </>
  );
};

export default MenuMobileBtn;

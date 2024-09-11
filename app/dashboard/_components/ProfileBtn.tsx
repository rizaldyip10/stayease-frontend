"use client";
import Image from "next/image";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import Link from "next/link";

const ProfileBtn = () => {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Image
          src="https://ui-avatars.com/api/?name=Rizaldy+Putra"
          alt="pp"
          className="w-6 h-6 rounded-full"
          width={24}
          height={24}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs text-blue-950">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
          <Link href="/profile" className="flex gap-1">
            <CircleUserRound className="w-4 h-4 text-blue-950" />
            <p>My Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
          <Link href="/profile/settings" className="flex gap-1">
            <Settings className="w-4 h-4 text-blue-950" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs flex items-center text-red-700 gap-1">
          <Link href="/" onClick={() => logout()} className="flex gap-1">
            <LogOut className="w-4 h-4 text-red-700" />
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;

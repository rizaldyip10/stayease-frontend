"use client";
import { CircleUserRound, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RxDashboard } from "react-icons/rx";

interface ProfileBtnProps {
  isDashboard: boolean;
}

const ProfileBtn: React.FC = () => {
  const { data: session } = useSession();

  const initials =
    (session?.user?.firstName?.[0] ?? "") +
    (session?.user?.lastName?.[0] ?? "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center">
        <Avatar className="w-10 h-10">
          <AvatarImage src={session?.user.avatar} alt="avatar" />
          <AvatarFallback> {initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-xs text-blue-950">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
          <Link href="/dashboard" className="flex gap-1">
            <RxDashboard className="w-4 h-4 text-blue-950" />
            <p>Dashboard</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
          <Link href="/profile" className="flex gap-1">
            <CircleUserRound className="w-4 h-4 text-blue-950" />
            <p>Profile</p>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
          <Link href="/profile/settings" className="flex gap-1">
            <Settings className="w-4 h-4 text-blue-950" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-xs flex items-center text-red-700 gap-1">
          <Link href="/" onClick={() => signOut()} className="flex gap-1">
            <LogOut className="w-4 h-4 text-red-700" />
            Log Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;

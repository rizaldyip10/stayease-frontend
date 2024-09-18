"use client";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "@/auth";

const ProfileBtn = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center lg:hidden">
        <CircleUserRound className="w-7 h-7 rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {session ? (
          <>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/" onClick={() => signOut()}>
                Logout
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
            <Link href="/login">Login/Register</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;

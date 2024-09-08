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
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { any } from "prop-types";

const ProfileBtn = () => {
  const { auth, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center lg:hidden">
        <CircleUserRound className="w-7 h-7 rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {auth ? (
          <>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs flex items-center text-blue-950 gap-1">
              <Link href="/" onClick={() => logout()}>
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

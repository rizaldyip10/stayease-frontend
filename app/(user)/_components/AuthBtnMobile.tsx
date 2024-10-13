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
import { useSignOut } from "@/hooks/auth/useSignOut";
import GlobalLoading from "@/components/GlobalLoading";

const ProfileBtn = () => {
  const { data: session } = useSession();
  const { handleSignOut, isLoading } = useSignOut();

  if (isLoading) return <GlobalLoading fullPage />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center md:hidden">
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
              <Link
                href="#"
                onClick={() =>
                  handleSignOut({ redirect: true, callbackUrl: "/" })
                }
              >
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

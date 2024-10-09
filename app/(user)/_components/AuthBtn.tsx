"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PersonIcon } from "@radix-ui/react-icons";
import { TbLogin2 } from "react-icons/tb";
import { UserCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AuthBtn = () => {
  return (
    <div className="items-center gap-2 flex">
      {/* Desktop version */}
      <Link href="/login" className="hidden md:flex">
        <Button variant="outline" className="text-blue-950 border-blue-950">
          Login/Register
        </Button>
      </Link>

      {/* Mobile version with Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="text-blue-950 border-blue-950 md:hidden p-2"
          >
            <UserCircle className="text-blue-950 h-6 w-6" />
            <span className="sr-only">Account</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="flex flex-col space-y-1">
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="ghost" className="w-full justify-start">
                Register
              </Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AuthBtn;

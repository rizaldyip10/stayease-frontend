"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin";
import { useSession } from "next-auth/react";
import { signOut } from "@/auth";

const AuthBtn = () => {
  const { data: session } = useSession();

  return (
    <div className="items-center gap-2 hidden lg:flex">
      <Link href="/login">
        <Button variant="outline" className="text-blue-950 border-blue-950">
          Login/Register
        </Button>
      </Link>
    </div>
  );
};

export default AuthBtn;

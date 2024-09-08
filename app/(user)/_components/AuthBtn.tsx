"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const AuthBtn = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="items-center gap-2 hidden lg:flex">
      {auth ? (
        <Link href="/">
          <Button
            variant="outline"
            className="text-blue-950 border-blue-950"
            onClick={() => logout()}
          >
            Logout
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button variant="outline" className="text-blue-950 border-blue-950">
            Login/Register
          </Button>
        </Link>
      )}
      {/*<Link href="/register">*/}
      {/*  <Button className="text-white bg-blue-950">Register</Button>*/}
      {/*</Link>*/}
    </div>
  );
};

export default AuthBtn;

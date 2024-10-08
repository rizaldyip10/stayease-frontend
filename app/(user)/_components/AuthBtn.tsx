"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthBtn = () => {
  return (
    <div className="items-center gap-2 flex">
      <Link href="/login">
        <Button variant="outline" className="text-blue-950 border-blue-950">
          Login/Register
        </Button>
      </Link>
    </div>
  );
};

export default AuthBtn;

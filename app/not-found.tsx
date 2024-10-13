import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";
import { TbHomeSearch } from "react-icons/tb";

const NotFound = () => {
  return (
    <div className="bg-slate-200 min-h-screen max-h-screen flex flex-col justify-center items-center px-6 py-5 sm:px-6 lg:px-8 gap-3">
      <TbHomeSearch className="w-72 h-72 text-blue-950" />
      <div className="text-center text-lg text-blue-950 mb-3 flex flex-col gap-3">
        <p className="text-3xl font-semibold">
          The page you&apos;re looking found is not here.
        </p>
        <p>Let’s get you back to finding your perfect stay!</p>
      </div>
      <Button
        variant="outline"
        className="rounded-md bg-blue-950 drop-shadow-xl text-white hover:bg-gray-200 hover:text-blue-950 active:bg-blue-800"
        asChild
      >
        <Link href="/">Find Your Next Getaway</Link>
      </Button>
    </div>
  );
};

export default NotFound;

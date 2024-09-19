import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

const NotFound = () => {
  return (
    <div className="bg-slate-200 min-h-screen max-h-screen flex flex-col justify-center items-center px-6 py-5 sm:px-6 lg:px-8 gap-3">
      <Image
        src={`https://res.cloudinary.com/duxay6ujg/image/upload/v1726781541/404-home_udaktt.webp`}
        alt="404"
        height={256}
        width={256}
      />
      <div className="text-center text-lg text-blue-900 mb-3">
        <p>
          Looks like this page has gone on{" "}
          <span className="font-semibold">vacation</span>.
        </p>
        <p>Let’s get you back to finding your perfect stay!</p>
      </div>
      <Button
        variant="outline"
        className="rounded-md bg-blue-900 drop-shadow-xl text-white hover:bg-blue-600 active:bg-blue-950"
        asChild
      >
        <Link href="/">Find Your Next Getaway</Link>
      </Button>
    </div>
  );
};

export default NotFound;

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsHouseCheckFill } from "react-icons/bs";
import { GiLockedDoor } from "react-icons/gi";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200">
      <h1 className="text-6xl font-bold text-blue-950 mb-4">
        401 - Unauthorized
      </h1>
      <p className="text-xl text-black mb-6">
        Oops! Looks like you&apos;re not{" "}
        <span className="font-semibold italic">checked in</span> yet.
      </p>
      <GiLockedDoor className="w-60 h-60 text-blue-950 mb-12" />
      <Link
        href="/login"
        className="px-6 py-2 rounded-md bg-blue-950 drop-shadow-xl text-white hover:border-blue-950 hover:border-2 hover:bg-gray-200 hover:text-blue-950 active:bg-blue-800"
      >
        Log In or Sign Up
      </Link>
    </div>
  );
};

export default Unauthorized;

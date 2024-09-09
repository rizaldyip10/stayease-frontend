import Image from "next/image";
import Link from "next/link";
import React from "react";

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200">
      <h1 className="text-6xl font-bold text-appblue-900 mb-4">
        401 - Unauthorized
      </h1>
      <p className="text-xl text-black mb-6">
        Oops! Looks like you&apos;re not{" "}
        <span className="font-semibold italic">checked in</span> yet.
      </p>
      <Image
        src="/house-lock.svg"
        alt="Unauthorized"
        className="mb-8 h-64 w-64"
        width={256}
        height={256}
      />
      <Link
        href="/login"
        className="bg-appblue-900 text-white px-6 py-2 rounded hover:bg-appblue-800"
      >
        Log In or Sign Up
      </Link>
    </div>
  );
};

export default Unauthorized;

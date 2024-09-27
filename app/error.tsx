"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { GiGroundbreaker } from "react-icons/gi";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-slate-200">
      <GiGroundbreaker className="w-72 h-72 text-blue-950" />
      <h1 className="md:text-4xl text-3xl text-center font-bold text-blue-950 mb-4 flex flex-col md:gap-5">
        <p>Oops!</p>
        <p>This property is under construction =(</p>
      </h1>
      <p className="text-md text-black mb-6 text-center">
        Try ringing the bell again, or we can take you back to the home page!
      </p>
      <div className="space-x-4">
        <button
          onClick={() => (reset ? reset() : router.refresh())}
          className="px-6 py-2 rounded-md hover:bg-blue-950 drop-shadow-xl hover:text-white hover:border-white hover:border-2 bg-gray-200 text-blue-950 active:bg-blue-800"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-md bg-blue-950 drop-shadow-xl text-white hover:border-blue-950 hover:border-2 hover:bg-gray-200 hover:text-blue-950 active:bg-blue-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

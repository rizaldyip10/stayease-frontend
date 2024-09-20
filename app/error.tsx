"use client";

import { useRouter } from "next/navigation";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-slate-200">
      <h1 className="md:text-4xl text-3xl text-center font-bold text-blue-950 mb-4 flex flex-col md:gap-5">
        <p>Oops!</p>
        <p>This property is under construction =(</p>
      </h1>
      <p className="text-md text-black mb-6 text-center">
        Try ringing the bell again, or we can take you back to the home page!
      </p>
      <img src="/broken-house.svg" alt="Error" className="mb-8 h-64 w-64" />
      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-blue-900"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-blue-900"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

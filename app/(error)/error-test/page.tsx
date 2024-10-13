"use client";
import React, { useState } from "react";
import ErrorPage from "@/app/error";
import NotFound from "@/app/not-found";
import ErrorComponent from "@/components/ErrorComponent";

const TestGlobalError = () => {
  const [error, setError] = useState<Error | null>(new Error("Test Error"));

  const resetError = () => {
    setError(null);
  };

  return (
    <div>
      {error ? (
        // <ErrorPage error={error} reset={resetError} />
        <ErrorComponent message={error.message} />
      ) : (
        // <NotFound />
        <div className="text-center">
          <h1 className="text-2xl font-bold">No Error</h1>
          <button
            onClick={() => setError(new Error("Test Error"))}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Simulate Error
          </button>
        </div>
      )}
    </div>
  );
};

export default TestGlobalError;

import React from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UnauthorizedPropertyAccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 p-8 rounded-lg shadow-md">
      <AlertTriangle className="text-blue-950 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold text-blue-950 mb-2">
        Unauthorized Access
      </h2>
      <p className="text-gray-700 text-center mb-4">
        You don&apos;t have permission to view this property. It may belong to
        another user.
      </p>
      <div className="w-full max-w-md bg-white p-6 rounded-md border-l-4 border-blue-950">
        <p className="text-sm text-gray-600">
          If you believe this is an error, please contact support or verify that
          you&apos;re logged into the correct account.
        </p>
      </div>
      <Link href="/dashboard/properties">
        <Button variant="link">
          <p className="text=blue-950">Return to property list</p>
        </Button>
      </Link>
    </div>
  );
};

export default UnauthorizedPropertyAccess;

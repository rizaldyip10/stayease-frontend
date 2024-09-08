"use client";
import Navigation from "@/app/check-email/_components/Navigation";
import { AuthProvider } from "@/components/AuthProvider";
import React from "react";

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navigation />
      <>{children}</>
    </AuthProvider>
  );
}

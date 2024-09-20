"use client";
import React from "react";
import Navbar from "@/app/(user)/_components/Navbar";
import Footer from "@/app/(user)/_components/footer/Footer";
import ContactForm from "@/app/(home)/_components/landing-page/ContactForm";

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full flex flex-col items-center min-h-screen relative bg-[#FAFAFA]">
        <Navbar />
        <div className="w-full 2xl:w-[1400px] px-6 md:px-14 py-6">
          {children}
        </div>
      </div>
      <ContactForm />
      <Footer />
    </>
  );
};

export default RoutesLayout;

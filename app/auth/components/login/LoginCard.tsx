"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/assets/images/logo_horizontal.png";
import googleLogo from "@/assets/icons/google-icon.png";
import Link from "next/link";
import LoginForm from "@/app/auth/components/login/LoginForm";

const LoginCard = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-96 max-sm:w-80 max-sm:px-5 flex flex-col items-center bg-white px-7 py-10 gap-5"
        initial={{ opacity: 0, y: "-25px" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full flex flex-col items-center gap-6">
          <Image src={logo} alt="logo" height={50} />
          <h1 className="text-3xl font-bold text-blue-950">Log In</h1>
        </div>
        <LoginForm />
        <div className="w-full relative mt-2">
          <hr className="bg-neutral-500 w-full relative" />
          <h1
            className="absolute right-1/2 translate-x-1/2 -translate-y-1/2 bg-white
                    text-neutral-500 text-sm"
          >
            OR
          </h1>
        </div>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Image src={googleLogo} alt={"google"} height={20} />
          Login with Google
        </Button>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-600">Don&apos;t have an account?</p>
          <Link href="/register" className="text-sm font-bold text-blue-950">
            Register
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginCard;

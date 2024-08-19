import React from "react";
import { Button } from "@/components/ui/button";
import { className } from "postcss-selector-parser";

interface SocialProps {
  className?: string;
  icon: string;
  message: string;
}

const SocialLoginDesktop: React.FC<SocialProps> = ({
  className,
  icon,
  message,
}: {
  className?: string;
  icon: string;
  message: string;
}) => {
  return (
    <div className={className}>
      <Button className="w-full shadow-[0px_1px_2px_rgba(16,_24,_40,_0)] rounded-md bg-white border-appblue-900 border-[1px] border-solid overflow-hidden text-appblue-800 hover:text-white hover:bg-appblue-900 flex justify-center gap-2">
        <img
          className="w-6 relative h-6 overflow-hidden shrink-0"
          alt="social-login"
          src={icon}
        />
        <div className="relative leading-[24px] font-semibold text-sm">
          {message}
        </div>
      </Button>
    </div>
  );
};

export default SocialLoginDesktop;

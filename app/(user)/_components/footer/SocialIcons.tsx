import React from "react";
import { FaTiktok, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

import Link from "next/link";

interface SocialIconsProps {
  className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex space-x-4 mb-4">
        <Link href="#" aria-label="TikTok">
          <FaTiktok />
        </Link>
        <Link href="#" aria-label="Instagram">
          <FaInstagram />
        </Link>
        <Link href="#" aria-label="Facebook">
          <FaFacebook />
        </Link>
        <Link href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
};

export default SocialIcons;

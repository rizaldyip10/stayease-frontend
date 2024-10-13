import React from "react";
import Link from "next/link";

interface FooterNavProps {
  className?: string;
  title?: string;
  items: {
    label: string;
    href: string;
  }[];
}

const FooterNav: React.FC<FooterNavProps> = ({ className, title, items }) => {
  return (
    <div className={`${className} footer-nav`}>
      {title && (
        <h3 className="font-bold md:text-normal text-sm tracking-wide mb-2">
          {title}
        </h3>
      )}
      <ul className="md:text-left text-center">
        {items.map((item, index) => (
          <li key={index} className="mb-1 md:font-normal font-bold">
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNav;

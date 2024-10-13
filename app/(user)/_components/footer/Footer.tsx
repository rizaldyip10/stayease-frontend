import React from "react";
import SocialIcons from "@/app/(user)/_components/footer/SocialIcons";
import {
  footerNavigationItems,
  footerServicesItems,
  routes,
} from "@/constants/Routes";
import FooterNav from "@/app/(user)/_components/footer/FooterNav";
import FooterLogo from "@/app/(user)/_components/footer/FooterLogo";
import FooterResources from "@/app/(user)/_components/footer/FooterResources";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 md:min-h-[283px] min-h-[180px] flex justify-center">
      <div className="md:grid md:grid-cols-4 flex flex-col md:gap-32 gap-2 justify-center items-center">
        <FooterLogo />
        <FooterNav
          title="NAVIGATIONS"
          items={routes}
          className="hidden md:block"
        />
        <FooterNav
          title="SERVICES"
          items={footerServicesItems}
          className="hidden md:block"
        />
        <FooterNav items={footerNavigationItems} className="md:hidden" />
        <FooterResources />
        <SocialIcons className="md:hidden" />
      </div>
    </footer>
  );
};

export default Footer;

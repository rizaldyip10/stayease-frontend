"use client";

import {useMotionValueEvent, useScroll, motion} from "framer-motion";
import {useState} from "react";
import logo from "@/assets/images/logo_horizontal.png";
import Image from "next/image";
import AuthBtn from "@/app/(user)/_components/AuthBtn";
import NavRoutes from "@/app/(user)/_components/NavRoutes";
import ProfileBtn from "@/app/(user)/_components/ProfileBtn";
import MobileMenu from "@/app/(user)/_components/MobileMenu";
import AuthBtnMobile from "@/app/(user)/_components/AuthBtnMobile";
import {usePathname} from "next/navigation";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState<boolean>(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const prev = scrollY.getPrevious();
        if (latest > prev! && latest > 50) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            className="sticky top-0 w-full flex justify-center items-center h-16 border-b border-gray-200 bg-white px-5 z-50 md:px-14"
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            <div className="w-full 2xl:w-[1400px] flex justify-between items-center">
                <MobileMenu />
                <Image src={logo} alt={"logo"} height={40} className="h-10 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0" />
                <NavRoutes />
                <div className={pathname.startsWith("/book") ? "hidden" : "block"}>
                    <AuthBtn />
                    <AuthBtnMobile />
                    {/*<ProfileBtn />*/}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
"use client";

import logo from "@/assets/images/logo_horizontal.png";
import Image from "next/image";
import SidebarMobile from "@/app/dashboard/_components/SidebarMobile";
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {useState} from "react";
import ProfileBtn from "@/app/dashboard/_components/ProfileBtn";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous! && latest > 50) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });
    return (
        <motion.div
            className="sticky top-0 w-full flex justify-between z-50 items-center h-16 border-b border-gray-200 bg-white px-3 md:px-7"
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            <SidebarMobile />
            <Image src={logo} alt={"logo"} height={30} className="block lg:hidden" />
            <div className="lg:ml-auto">
                <ProfileBtn />
            </div>
        </motion.div>
    );
};

export default Navbar;
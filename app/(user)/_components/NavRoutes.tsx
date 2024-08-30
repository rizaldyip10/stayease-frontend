"use client";

import {routes} from "@/constants/Routes";
import {usePathname, useRouter} from "next/navigation";
import NavItems from "@/app/(user)/_components/NavItems";
import {cn} from "@/lib/utils";

const NavRoutes = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className={cn("items-center gap-2 absolute right-1/2 translate-x-1/2 hidden",
                pathname?.startsWith("/book") ? "lg:hidden": "lg:flex"
            )}>
            {
                routes.map((route, i) => (
                    <NavItems
                        key={i}
                        route={route}
                        onClick={() => router.push(route.href)}
                    />
                ))
            }
        </div>
    );
};

export default NavRoutes;
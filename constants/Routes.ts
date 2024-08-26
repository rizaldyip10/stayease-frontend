import {Calendar, ChartLine, LayoutGrid, LibraryBig, LucideIcon, Sofa, Star} from "lucide-react";

export type RouteType = {
    label: string;
    href: string;
};

export const routes: RouteType[] = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/about' },
]

export type SidebarRoutesType = {
    label: string;
    href: string;
    icon: LucideIcon;
};

export const adminRoutes: SidebarRoutesType[] = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { label: "Property", href: "/dashboard/properties", icon: Sofa },
    { label: "Room Availability", href: "/dashboard/room-availability", icon: Calendar },
    { label: "Booking Request", href: "/dashboard/booking-request", icon: LibraryBig },
    { label: "Reviews", href: "/dashboard/reviews", icon: Star },
    { label: "Reports", href: "/dashboard/reports", icon: ChartLine }
]
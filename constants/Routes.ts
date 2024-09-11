import {
  BookOpenText,
  Calendar,
  ChartLine,
  LayoutGrid,
  LibraryBig,
  LucideIcon,
  Sofa,
  Star,
  User,
} from "lucide-react";

export type RouteType = {
  label: string;
  href: string;
};

export const routes: RouteType[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

export type SidebarRoutesType = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const adminRoutes: SidebarRoutesType[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Property", href: "/dashboard/properties", icon: Sofa },
  {
    label: "Room Availability",
    href: "/dashboard/room-availability",
    icon: Calendar,
  },
  {
    label: "Booking Request",
    href: "/dashboard/booking-request",
    icon: LibraryBig,
  },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Reports", href: "/dashboard/reports", icon: ChartLine },
];

export type UserMenuRoutesType = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const userMenuRoutes: UserMenuRoutesType[] = [
  { label: "My Profile", href: "/profile", icon: User },
  { label: "My Bookings", href: "/profile/bookings", icon: BookOpenText },
  { label: "My Reviews", href: "/profile/reviews", icon: Star },
];

export const footerNavigationItems = [
  { label: "NAVIGATION", href: "/about" },
  { label: "SERVICES", href: "/faq" },
  { label: "RESOURCES", href: "/properties" },
];

export const footerServicesItems = [
  // TODO : make these links work
  { label: "Video Chat", href: "" },
  { label: "Housing Guide", href: "/" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

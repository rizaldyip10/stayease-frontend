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
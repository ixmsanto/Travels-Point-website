import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    Compass,
    GalleryHorizontalEnd,
    LayoutGrid,
    Mail,
    MessageSquareQuote,
    Tag,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { NavUser } from '@/components/nav-user';
import TravelLogo from '@/components/travel-logo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';

type AdminCounts = {
    offers: number;
    destinations: number;
    packages: number;
    testimonials: number;
    banners: number;
    inquiries: number;
};

type NavEntry = {
    title: string;
    href: string;
    icon: LucideIcon;
    countKey?: keyof AdminCounts;
};

const navItems: NavEntry[] = [
    { title: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { title: 'Offers', href: '/admin/offers', icon: Tag, countKey: 'offers' },
    {
        title: 'Destinations',
        href: '/admin/destinations',
        icon: Compass,
        countKey: 'destinations',
    },
    {
        title: 'Tour Packages',
        href: '/admin/packages',
        icon: Briefcase,
        countKey: 'packages',
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: MessageSquareQuote,
        countKey: 'testimonials',
    },
    {
        title: 'Homepage Banners',
        href: '/admin/banners',
        icon: GalleryHorizontalEnd,
        countKey: 'banners',
    },
    {
        title: 'Contact Inquiries',
        href: '/admin/inquiries',
        icon: Mail,
        countKey: 'inquiries',
    },
];

export function AppSidebar() {
    const { currentUrl } = useCurrentUrl();
    const counts = (usePage().props.adminCounts as AdminCounts | null) ?? null;

    const isActive = (href: string) =>
        href === '/admin'
            ? currentUrl === '/admin'
            : currentUrl.startsWith(href);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <TravelLogo
                                    markClassName="h-8 w-auto"
                                    wordClassName="text-base font-semibold"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Manage</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const count = item.countKey
                                ? counts?.[item.countKey]
                                : undefined;

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.href)}
                                        tooltip={{ children: item.title }}
                                    >
                                        <Link href={item.href} prefetch>
                                            <item.icon />
                                            <span>{item.title}</span>
                                            {count !== undefined &&
                                                count > 0 && (
                                                    <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-accent px-1.5 text-xs font-semibold text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden">
                                                        {count}
                                                    </span>
                                                )}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

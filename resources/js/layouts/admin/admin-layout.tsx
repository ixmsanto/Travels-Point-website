import { Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import ThemeToggle from '@/components/theme-toggle';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { cn } from '@/lib/utils';

type AdminCounts = {
    offers?: number;
    destinations?: number;
    packages?: number;
    regions?: number;
    testimonials?: number;
    banners?: number;
    gallery?: number;
    blog?: number;
    team?: number;
    inquiries?: number;
};

type NavItem = {
    label: string;
    href: string;
    icon: string;
    count?: number;
};

function initialsOf(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    useFlashMessages();
    const page = usePage();
    const currentPath = new URL(page.url, 'http://x').pathname;
    const counts = (page.props.adminCounts as AdminCounts | null) ?? {};
    const user = (page.props.auth as { user?: { name?: string } } | undefined)
        ?.user;

    const items: NavItem[] = [
        {
            label: 'Offers',
            href: '/admin/offers',
            icon: 'local_offer',
            count: counts.offers,
        },
        {
            label: 'Tour Packages',
            href: '/admin/packages',
            icon: 'luggage',
            count: counts.packages,
        },
        {
            label: 'Regions',
            href: '/admin/regions',
            icon: 'map',
            count: counts.regions,
        },
        {
            label: 'Testimonials',
            href: '/admin/testimonials',
            icon: 'reviews',
            count: counts.testimonials,
        },
        {
            label: 'Homepage Banners',
            href: '/admin/banners',
            icon: 'view_carousel',
            count: counts.banners,
        },
        {
            label: 'Gallery',
            href: '/admin/gallery',
            icon: 'photo_library',
            count: counts.gallery,
        },
        {
            label: 'Blog',
            href: '/admin/blog',
            icon: 'article',
            count: counts.blog,
        },
        {
            label: 'Team',
            href: '/admin/team',
            icon: 'groups',
            count: counts.team,
        },
        {
            label: 'Contact Inquiries',
            href: '/admin/inquiries',
            icon: 'mail',
            count: counts.inquiries,
        },
        {
            label: 'Site Settings',
            href: '/admin/settings',
            icon: 'settings',
        },
    ];

    const isActive = (href: string) => currentPath.startsWith(href);

    return (
        <div className="flex h-dvh flex-col bg-bg-2 text-foreground">
            {/* Top bar */}
            <header className="sticky top-0 z-30 flex h-[66px] shrink-0 items-center justify-between gap-4 border-b border-border bg-surface px-4 sm:px-7">
                <Link
                    href="/admin"
                    className="flex items-center gap-3"
                    aria-label="Admin dashboard"
                >
                    <span className="flex size-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#fb923c] to-primary-deep text-white">
                        <MaterialSymbol name="explore" size={22} weight={500} />
                    </span>
                    <span className="leading-tight">
                        <span className="block font-serif text-[20px] font-semibold text-foreground">
                            Travels Point
                        </span>
                        <span className="block text-[11px] font-bold tracking-[0.12em] text-primary-deep uppercase">
                            Admin Console
                        </span>
                    </span>
                </Link>

                <div className="flex items-center gap-2.5">
                    <Link
                        href="/"
                        className="hidden items-center gap-1.5 rounded-[11px] border border-border-strong bg-surface-2 px-3.5 py-2.5 text-[13.5px] font-bold text-foreground transition hover:border-primary hover:text-primary sm:inline-flex"
                    >
                        <MaterialSymbol name="open_in_new" size={17} />
                        View site
                    </Link>
                    <ThemeToggle />
                    {user?.name && (
                        <span className="flex size-[38px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#fb923c] text-[14px] font-extrabold text-white">
                            {initialsOf(user.name)}
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={() => router.post('/logout')}
                        aria-label="Log out"
                        className="flex size-10 items-center justify-center rounded-[11px] border border-border-strong bg-surface-2 text-soft transition hover:border-destructive hover:text-destructive"
                    >
                        <MaterialSymbol name="logout" size={20} />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (desktop) */}
                <aside className="hidden w-[248px] shrink-0 flex-col gap-1 overflow-y-auto border-r border-border bg-surface px-3.5 py-5 lg:flex">
                    <p className="px-3 pt-1.5 pb-2.5 text-[11px] font-bold tracking-[0.14em] text-faint uppercase">
                        Manage
                    </p>
                    {items.map((item) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-[12px] px-3.5 py-3 text-[14.5px] font-semibold transition',
                                    active
                                        ? 'bg-primary-soft text-primary-deep'
                                        : 'text-soft hover:translate-x-0.5 hover:bg-primary-soft hover:text-primary',
                                )}
                            >
                                <MaterialSymbol name={item.icon} size={21} />
                                <span className="flex-1">{item.label}</span>
                                {item.count != null && (
                                    <span
                                        className={cn(
                                            'rounded-full px-2.5 py-0.5 text-[12px] font-bold',
                                            active
                                                ? 'bg-primary text-white'
                                                : 'bg-surface-2 text-faint',
                                        )}
                                    >
                                        {item.count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </aside>

                {/* Main */}
                <main className="flex-1 overflow-y-auto">
                    {/* Mobile chip nav */}
                    <div className="flex gap-2 overflow-x-auto border-b border-border bg-surface px-4 py-3 lg:hidden">
                        {items.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] font-bold whitespace-nowrap transition',
                                        active
                                            ? 'border-primary bg-primary-soft text-primary'
                                            : 'border-border bg-surface text-soft',
                                    )}
                                >
                                    <MaterialSymbol name={item.icon} size={17} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mx-auto max-w-[1180px] px-4 py-6 sm:px-7 sm:py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

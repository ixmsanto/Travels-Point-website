import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import MaterialSymbol from '@/components/material-symbol';
import ScrollToTop from '@/components/scroll-to-top';
import ThemeToggle from '@/components/theme-toggle';
import TravelLogo from '@/components/travel-logo';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';
import type { ContactDetails } from '@/types';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

// iOS-style floating bottom tab bar shown only on mobile.
const mobileTabs = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Packages', href: '/packages', icon: 'luggage' },
    { label: 'Gallery', href: '/gallery', icon: 'image' },
    { label: 'About', href: '/about', icon: 'info' },
];

const socials = [
    { label: 'Instagram', Icon: Instagram },
    { label: 'Facebook', Icon: Facebook },
    { label: 'YouTube', Icon: Youtube },
];

const exploreLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tour Packages', href: '/packages' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Featured Destinations', href: '/#destinations' },
    { label: 'Offers & Promotions', href: '/#offers' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

const WHATSAPP_URL = 'https://wa.me/97145550192';

export default function PublicLayout({ children }: { children: ReactNode }) {
    useFlashMessages();
    const page = usePage();
    useReveal(page.url);
    const currentPath = new URL(page.url, 'http://x').pathname;
    const contact = (page.props.contact as ContactDetails | undefined) ?? {
        address: 'Office 1204, Marina Plaza, Dubai Marina, UAE',
        phone: '+971 4 555 0192',
        email: 'hello@travelspoint.com',
    };
    const [email, setEmail] = useState('');

    const isTabActive = (href: string) => {
        const path = new URL(href, 'http://x').pathname;

        // Section links (e.g. /#packages) shouldn't steal Home's active state.
        if (path === '/') {
            return currentPath === '/' && !href.includes('#');
        }

        return currentPath === path || currentPath.startsWith(`${path}/`);
    };

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <div className="relative z-20 bg-gradient-to-r from-primary to-primary-deep text-white">
                <div className="mx-auto flex h-11 w-full max-w-[1240px] items-center justify-between gap-4 px-5 text-[13.5px] font-medium sm:px-8">
                    <span className="flex items-center gap-2">
                        <MaterialSymbol name="flight" size={18} />
                        <span className="hidden sm:inline">
                            Explore the World with Travels Point
                        </span>
                    </span>

                    <div className="flex items-center gap-4">
                        <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                        >
                            <MaterialSymbol name="call" size={17} />
                            <span className="hidden sm:inline">
                                {contact.phone}
                            </span>
                        </a>
                        <a
                            href={`mailto:${contact.email}`}
                            className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 sm:flex"
                        >
                            <MaterialSymbol name="mail" size={17} />
                            <span>{contact.email}</span>
                        </a>
                        <span className="hidden h-4 w-px bg-white/30 sm:block" />
                        <div className="flex items-center gap-2.5">
                            {socials.map(({ label, Icon }) => (
                                <button
                                    key={label}
                                    type="button"
                                    aria-label={label}
                                    className="transition-opacity hover:opacity-80"
                                >
                                    <Icon size={17} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-40 border-b border-[var(--glass-border,rgba(255,255,255,0.6))] bg-background/80 backdrop-blur-md backdrop-saturate-150">
                <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
                    <Link
                        href="/"
                        className="shrink-0"
                        aria-label="Travels Point home"
                    >
                        <TravelLogo />
                    </Link>

                    <nav className="hidden items-center gap-1.5 md:flex">
                        {navLinks.map((link) => {
                            const active = link.href === currentPath;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'relative rounded-control px-[15px] py-2.5 text-[15px] font-semibold transition-colors',
                                        active
                                            ? 'text-primary'
                                            : 'text-foreground/85 hover:bg-primary-soft hover:text-primary',
                                    )}
                                >
                                    {link.label}
                                    {active && (
                                        <span className="absolute right-[15px] bottom-[3px] left-[15px] h-0.5 rounded-full bg-gradient-to-r from-primary to-primary-deep" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-2.5">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <main className="flex-1 pb-[calc(96px+env(safe-area-inset-bottom))] md:pb-0">
                {children}
            </main>

            <footer className="relative z-20 border-t border-border bg-bg-2">
                <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 pt-14 pb-0 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
                    <div>
                        <TravelLogo />
                        <p className="mt-4.5 max-w-sm text-[15px] leading-relaxed text-soft">
                            Tailor-made journeys across 120+ destinations —
                            honeymoons, family escapes, group tours and
                            corporate travel, handled end to end.
                        </p>
                        <div className="mt-6 flex gap-2.5">
                            {socials.map(({ label, Icon }) => (
                                <button
                                    key={label}
                                    type="button"
                                    aria-label={label}
                                    className="flex size-10 items-center justify-center rounded-control border border-border-strong bg-surface text-soft transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                                >
                                    <Icon size={19} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[13px] font-bold tracking-[0.14em] text-faint uppercase">
                            Explore
                        </p>
                        <ul className="mt-4 space-y-3 text-[15px]">
                            {exploreLinks.map((link) => {
                                const linkClass =
                                    'inline-block text-soft transition-all hover:translate-x-1 hover:text-primary';

                                // Section anchors (e.g. /#destinations) use a
                                // native <a> so the browser navigates and scrolls
                                // to the section; an Inertia <Link> would swap the
                                // page without honouring the #fragment.
                                return (
                                    <li key={link.label}>
                                        {link.href.includes('#') ? (
                                            <a
                                                href={link.href}
                                                className={linkClass}
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className={linkClass}
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div>
                        <p className="text-[13px] font-bold tracking-[0.14em] text-faint uppercase">
                            Get in touch
                        </p>
                        <ul className="mt-4 space-y-3.5 text-[15px] text-soft">
                            <li className="flex gap-2.5">
                                <MaterialSymbol
                                    name="location_on"
                                    size={19}
                                    className="mt-0.5 shrink-0 text-primary-deep"
                                />
                                <span>{contact.address}</span>
                            </li>
                            <li className="flex gap-2.5">
                                <MaterialSymbol
                                    name="call"
                                    size={19}
                                    className="mt-0.5 shrink-0 text-primary-deep"
                                />
                                <a
                                    href={`tel:${contact.phone}`}
                                    className="hover:text-primary"
                                >
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="flex gap-2.5">
                                <MaterialSymbol
                                    name="mail"
                                    size={19}
                                    className="mt-0.5 shrink-0 text-primary-deep"
                                />
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="hover:text-primary"
                                >
                                    {contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-[13px] font-bold tracking-[0.14em] text-faint uppercase">
                            Travel inspiration, monthly
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-soft">
                            Hand-picked deals and new destinations. No spam.
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                if (!email) {
                                    return;
                                }

                                setEmail('');
                                toast.success(
                                    'You are on the list — welcome aboard!',
                                );
                            }}
                            className="mt-4 flex gap-2 rounded-button border border-border-strong bg-surface p-1.5"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                aria-label="Your email"
                                className="flex-1 bg-transparent px-3 py-2.5 text-[14.5px] outline-none placeholder:text-faint"
                            />
                            <button
                                type="submit"
                                className="rounded-control bg-gradient-to-br from-primary to-primary-deep px-[18px] py-2.5 text-[14px] font-bold text-white"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mx-auto mt-12 w-full max-w-[1240px] px-5 sm:px-8">
                    <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-border py-6 text-[14px] text-faint">
                        <p>
                            © {new Date().getFullYear()} Travels Point. All
                            rights reserved.
                        </p>
                        <div className="flex items-center gap-5">
                            <span>IATA · ASTA · ATOL Protected</span>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
                            >
                                <MaterialSymbol name="lock" size={16} />
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

            <ScrollToTop />

            <button
                type="button"
                onClick={() => {
                    window.open(WHATSAPP_URL, '_blank', 'noopener');
                    toast('Our travel team is just a message away ✈️');
                }}
                className="tp-pulse fixed right-5 bottom-[calc(84px+env(safe-area-inset-bottom))] z-40 inline-flex h-[60px] items-center gap-2.5 rounded-full bg-[#25D366] pr-5 pl-4 text-[14.5px] font-bold text-white shadow-[0_16px_34px_-12px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 md:bottom-5"
            >
                <MaterialSymbol name="chat" size={28} fill />
                <span className="hidden sm:inline">Chat with us</span>
            </button>

            {/* iOS-style sticky bottom tab bar — mobile only */}
            <nav
                aria-label="Primary"
                className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--glass-border,rgba(255,255,255,0.6))] bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md backdrop-saturate-150 md:hidden"
            >
                <div className="mx-auto grid max-w-md grid-cols-4">
                    {mobileTabs.map((tab) => {
                        const active = isTabActive(tab.href);

                        return (
                            <Link
                                key={tab.label}
                                href={tab.href}
                                className={cn(
                                    'flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-semibold transition-colors',
                                    active
                                        ? 'text-primary'
                                        : 'text-soft hover:text-primary',
                                )}
                            >
                                <MaterialSymbol
                                    name={tab.icon}
                                    size={24}
                                    fill={active}
                                />
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}

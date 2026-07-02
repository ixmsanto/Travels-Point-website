import { Link, router, usePage } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Linkedin,
    Music2,
    Twitter,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import MaterialSymbol from '@/components/material-symbol';
import MobileBottomBar from '@/components/mobile-bottom-bar';
import ContactPopup from '@/components/public/contact-popup';
import ScrollToTop from '@/components/scroll-to-top';
import ThemeToggle from '@/components/theme-toggle';
import TravelLogo from '@/components/travel-logo';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { useReveal } from '@/hooks/use-reveal';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';
import type { ContactDetails, SocialPlatform } from '@/types';

const navLinks = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Packages', href: '/packages', icon: 'luggage' },
    { label: 'Gallery', href: '/gallery', icon: 'image' },
    { label: 'Blog', href: '/blog', icon: 'article' },
    { label: 'About', href: '/about', icon: 'info' },
    { label: 'Contact', href: '/contact', icon: 'mail' },
];

// Icon + display label for each supported social platform. The actual URLs
// come from admin Site Settings (shared as `contact.socials`).
const socialMeta: Record<SocialPlatform, { label: string; Icon: LucideIcon }> = {
    instagram: { label: 'Instagram', Icon: Instagram },
    facebook: { label: 'Facebook', Icon: Facebook },
    youtube: { label: 'YouTube', Icon: Youtube },
    twitter: { label: 'X (Twitter)', Icon: Twitter },
    linkedin: { label: 'LinkedIn', Icon: Linkedin },
    tiktok: { label: 'TikTok', Icon: Music2 },
};

// Render order for the social icons.
const socialOrder: SocialPlatform[] = [
    'instagram',
    'facebook',
    'youtube',
    'twitter',
    'linkedin',
    'tiktok',
];

const exploreLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tour Packages', href: '/packages' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Featured Destinations', href: '/#destinations' },
    { label: 'Offers & Promotions', href: '/#offers' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
];

// Compact round icon button used in the header's top utility bar. White glyph
// on a translucent fill so it reads on the brand bar in both light and dark.
const iconBarButton =
    'flex size-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25';

const FALLBACK_CONTACT: ContactDetails = {
    address: 'Office 1204, Marina Plaza, Dubai Marina, UAE',
    phone: '+971 4 555 0192',
    whatsapp: '+971 4 555 0192',
    whatsapp_url: 'https://wa.me/97145550192',
    email: 'hello@travelspoint.com',
    socials: {},
};

export default function PublicLayout({ children }: { children: ReactNode }) {
    useFlashMessages();
    const page = usePage();
    useReveal(page.url);
    const currentPath = new URL(page.url, 'http://x').pathname;
    const contact =
        (page.props.contact as ContactDetails | undefined) ?? FALLBACK_CONTACT;
    // Null for guests — drives the footer Admin/Logout swap.
    const authUser = page.props.auth?.user;

    // Configured social links, in display order (empty ones are omitted).
    const socialLinks = socialOrder
        .filter((key) => contact.socials?.[key])
        .map((key) => ({
            key,
            href: contact.socials[key] as string,
            ...socialMeta[key],
        }));

    const whatsappUrl = contact.whatsapp_url ?? FALLBACK_CONTACT.whatsapp_url;
    const [email, setEmail] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    // On the home page the header floats transparently over the full-bleed hero
    // image, turning into a solid bar once the visitor scrolls past the top.
    const isHome = currentPath === '/';
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [page.url]);
    const overlay = isHome && !scrolled;

    const isLinkActive = (href: string) => {
        const path = new URL(href, 'http://x').pathname;

        if (path === '/') {
            return currentPath === '/';
        }

        return currentPath === path || currentPath.startsWith(`${path}/`);
    };

    return (
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
            {/* Top group. On mobile it's a normal solid bar sitting ABOVE the
                hero (in flow — no overlap). On desktop home it floats
                transparently OVER the hero (image reaches the top), turning
                solid once scrolled. `overlay` transparency is md-only. */}
            <div
                className={cn(
                    isHome
                        ? 'contents md:fixed md:inset-x-0 md:top-0 md:z-40 md:block'
                        : 'contents',
                    overlay &&
                        'md:bg-gradient-to-b md:from-black/45 md:via-black/15 md:to-transparent',
                )}
            >
            <div
                className={cn(
                    'relative z-20 bg-gradient-to-r from-primary to-primary-deep text-white transition-colors',
                    overlay && 'md:bg-none',
                )}
            >
                <div className="mx-auto flex h-11 w-full max-w-[1240px] items-center justify-between gap-4 px-5 text-[13.5px] font-medium sm:px-8">
                    <span className="flex items-center gap-2">
                        <MaterialSymbol name="flight" size={18} />
                        <span className="hidden sm:inline">
                            Explore the World with Travels Point
                        </span>
                    </span>

                    {/* Compact, theme-adaptive social bar — driven by the
                        admin Site Settings (one icon per saved social link). */}
                    {socialLinks.length > 0 && (
                        <div className="flex items-center gap-1.5">
                            {socialLinks.map(({ key, href, label, Icon }) => (
                                <a
                                    key={key}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={iconBarButton}
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <header
                className={cn(
                    'sticky top-0 z-40 border-b border-[var(--glass-border,rgba(255,255,255,0.6))] bg-background/80 backdrop-blur-md backdrop-saturate-150 transition-colors',
                    overlay &&
                        'md:border-transparent md:bg-transparent md:backdrop-blur-none md:backdrop-saturate-100',
                )}
            >
                <div className="mx-auto flex h-[74px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-8">
                    <Link
                        href="/"
                        className="shrink-0"
                        aria-label="Travels Point home"
                    >
                        <TravelLogo
                            wordClassName={overlay ? 'md:text-white' : undefined}
                        />
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
                                        overlay
                                            ? active
                                                ? 'text-white'
                                                : 'text-white/85 hover:bg-white/10 hover:text-white'
                                            : active
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

                        {/* Mobile navigation drawer */}
                        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                            <SheetTrigger asChild>
                                <button
                                    type="button"
                                    aria-label="Open menu"
                                    className="flex size-10 items-center justify-center rounded-control border border-border-strong bg-surface text-foreground transition hover:border-primary hover:text-primary md:hidden"
                                >
                                    <MaterialSymbol name="menu" size={24} />
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[80%] max-w-[320px] gap-0 p-0"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation
                                </SheetTitle>

                                <div className="flex h-[74px] items-center border-b border-border px-5">
                                    <TravelLogo />
                                </div>

                                <nav className="flex flex-col gap-1 p-4">
                                    {navLinks.map((link) => {
                                        const active = isLinkActive(link.href);

                                        return (
                                            <SheetClose asChild key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className={cn(
                                                        'flex items-center gap-3 rounded-control px-4 py-3 text-[15.5px] font-semibold transition-colors',
                                                        active
                                                            ? 'bg-primary-soft text-primary'
                                                            : 'text-foreground/85 hover:bg-primary-soft hover:text-primary',
                                                    )}
                                                >
                                                    <MaterialSymbol
                                                        name={link.icon}
                                                        size={22}
                                                        fill={active}
                                                    />
                                                    {link.label}
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </nav>

                                <div className="mt-auto border-t border-border p-4">
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="flex items-center gap-3 rounded-control px-4 py-3 text-[14.5px] font-semibold text-soft transition-colors hover:text-primary"
                                    >
                                        <MaterialSymbol name="call" size={20} />
                                        {contact.phone}
                                    </a>
                                    {socialLinks.length > 0 && (
                                        <div className="mt-3 flex items-center gap-2.5 px-4">
                                            {socialLinks.map(
                                                ({ key, href, label, Icon }) => (
                                                    <a
                                                        key={key}
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={label}
                                                        className="flex size-10 items-center justify-center rounded-control border border-border-strong bg-surface text-soft transition hover:border-primary hover:text-primary"
                                                    >
                                                        <Icon size={18} />
                                                    </a>
                                                ),
                                            )}
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
            </div>

            <main className="flex-1">{children}</main>

            <footer className="relative z-20 border-t border-border bg-bg-2 pb-[76px] md:pb-0">
                <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 pt-14 pb-0 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
                    <div>
                        <TravelLogo />
                        <p className="mt-4.5 max-w-sm text-[15px] leading-relaxed text-soft">
                            Tailor-made journeys across 120+ destinations —
                            honeymoons, family escapes, group tours and
                            corporate travel, handled end to end.
                        </p>
                        {socialLinks.length > 0 && (
                            <div className="mt-6 flex gap-2.5">
                                {socialLinks.map(({ key, href, label, Icon }) => (
                                    <a
                                        key={key}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="flex size-10 items-center justify-center rounded-control border border-border-strong bg-surface text-soft transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                                    >
                                        <Icon size={19} />
                                    </a>
                                ))}
                            </div>
                        )}
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
                    {/* Legal / Admin kept left-grouped so the bottom-right
                        corner stays free for the floating WhatsApp button —
                        no overlap and no padding gap at any width. */}
                    <div className="flex flex-col items-center gap-3 border-t border-border py-8 text-center text-[14px] text-faint sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 sm:text-left lg:justify-start">
                        <p>
                            © {new Date().getFullYear()} Travels Point. All
                            rights reserved.
                        </p>
                        <span
                            aria-hidden
                            className="hidden h-3.5 w-px bg-border-strong lg:inline-block"
                        />
                        <span>IATA · ASTA · ATOL Protected</span>
                        {authUser ? (
                            <Link
                                href={logout()}
                                as="button"
                                onClick={() => router.flushAll()}
                                className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
                            >
                                <MaterialSymbol name="logout" size={16} />
                                Logout
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-primary"
                            >
                                <MaterialSymbol name="lock" size={16} />
                                Admin
                            </Link>
                        )}
                    </div>
                </div>
            </footer>

            <ScrollToTop />

            <button
                type="button"
                onClick={() => {
                    if (whatsappUrl) {
                        window.open(whatsappUrl, '_blank', 'noopener');
                    }

                    toast('Our travel team is just a message away ✈️');
                }}
                className="tp-pulse fixed right-5 bottom-[calc(20px+env(safe-area-inset-bottom))] z-40 hidden h-[60px] items-center gap-2.5 rounded-full bg-primary pr-5 pl-4 text-[14.5px] font-bold text-white shadow-[0_16px_34px_-12px_rgba(234,88,12,0.7)] transition-transform hover:scale-105 md:bottom-5 md:inline-flex"
            >
                <MaterialSymbol name="chat" size={28} fill />
                <span className="hidden sm:inline">Chat with us</span>
            </button>

            <MobileBottomBar contact={contact} />

            <ContactPopup />
        </div>
    );
}

import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import GradientThumb from '@/components/gradient-thumb';
import { HeroControls, useHeroSlider } from '@/components/hero-slider';
import MaterialSymbol from '@/components/material-symbol';
import BlogCard from '@/components/public/blog-card';
import { CtaButton } from '@/components/public/button';
import { Section, Container } from '@/components/public/section';
import { Eyebrow, SectionHeading } from '@/components/public/section-heading';
import { Chip, IconTile } from '@/components/public/ui';
import { formatINR } from '@/lib/currency';
import { cn } from '@/lib/utils';
import type {
    Banner,
    BlogPost,
    ContactDetails,
    Destination,
    GalleryItem,
    Offer,
    Testimonial,
    TourPackage,
} from '@/types';

type Props = {
    banners: Banner[];
    destinations: Destination[];
    packages: TourPackage[];
    offers: Offer[];
    testimonials: Testimonial[];
    gallery?: GalleryItem[];
    posts?: BlogPost[];
    contact: ContactDetails;
};

// How many packages to preview on the home page before "View all".
const HOME_PACKAGE_LIMIT = 6;

// How many gallery images to preview on the home page before "View all".
const HOME_GALLERY_LIMIT = 8;

const features = [
    {
        icon: 'support_agent',
        title: '24/7 on-trip support',
        text: 'A real human is one message away, in your timezone, from the moment you book to the flight home.',
    },
    {
        icon: 'verified_user',
        title: 'Visas & paperwork handled',
        text: 'Flights, hotels, visas and transfers — we take care of the fine print so you only pack a bag.',
    },
    {
        icon: 'savings',
        title: 'Best-price promise',
        text: 'Direct partnerships with airlines and hotels mean curated trips without the curated markup.',
    },
    {
        icon: 'diversity_3',
        title: 'Local expert guides',
        text: 'On-the-ground specialists who turn the usual sights into stories worth retelling.',
    },
];

const stats = [
    { icon: 'luggage', value: '3,200+', label: 'Tours Completed' },
    { icon: 'public', value: '120+', label: 'Destinations Covered' },
    { icon: 'star', value: '4.9/5', label: 'Average Rating' },
    { icon: 'workspace_premium', value: '16+', label: 'Years of Experience' },
];

// Handwritten gold words that rotate above the hero headline.
const heroWords = ['unforgettable', 'life-changing', 'tailor-made', 'worldclass'];

// Static reassurance perks shown on every offer card to fill the layout.
const offerPerks = [
    'Handpicked stays',
    'Free cancellation',
    '24/7 travel concierge',
    'Best-price promise',
];

// Animates the numeric portion of a stat (e.g. "3,200+", "4.9/5") counting up
// from zero once it scrolls into view. Non-numeric prefix/suffix and any comma
// grouping / decimal precision from the source string are preserved.
function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const match = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    const [display, setDisplay] = useState(() => (match ? match[1] + '0' + match[3] : value));

    useEffect(() => {
        const el = ref.current;
        if (!el || !match) return;

        const prefix = match[1];
        const numStr = match[2];
        const suffix = match[3];
        const target = parseFloat(numStr.replace(/,/g, ''));
        const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
        const grouped = numStr.includes(',');

        const format = (n: number) => {
            const str = n.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
                useGrouping: grouped,
            });
            return prefix + str + suffix;
        };

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setDisplay(format(target));
            return;
        }

        let raf = 0;
        let start = 0;
        const duration = 2600;
        const tick = (now: number) => {
            if (!start) start = now;
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(format(target * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry], obs) => {
                if (entry.isIntersecting) {
                    raf = requestAnimationFrame(tick);
                    obs.disconnect();
                }
            },
            { threshold: 0.4 },
        );
        observer.observe(el);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [value]);

    return (
        <span ref={ref} className="tabular-nums">
            {display}
        </span>
    );
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
    return (
        <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <MaterialSymbol
                    key={i}
                    name="star"
                    size={size}
                    fill={i < Math.round(rating)}
                    className={
                        i < Math.round(rating)
                            ? 'text-gold'
                            : 'text-border-strong'
                    }
                />
            ))}
        </span>
    );
}

export default function Home({
    banners,
    packages,
    offers,
    testimonials,
    gallery = [],
    posts = [],
    contact,
}: Props) {
    const whatsappUrl = contact.whatsapp_url ?? `tel:${contact.phone}`;
    const [offerIndex, setOfferIndex] = useState(0);
    const [tIndex, setTIndex] = useState(0);
    // Cycles the gold script word above the hero headline.
    const [heroWord, setHeroWord] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setHeroWord((i) => (i + 1) % heroWords.length),
            3200,
        );
        return () => clearInterval(id);
    }, []);
    // Full-size preview of an offer poster, opened by clicking its thumbnail.
    const [offerPreview, setOfferPreview] = useState<{
        src: string;
        title: string;
    } | null>(null);

    useEffect(() => {
        if (!offerPreview) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOfferPreview(null);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [offerPreview]);

    const offerCount = offers.length;
    const tCount = testimonials.length;

    // Active Hero-placement banners with image or video drive the hero slider.
    const heroBanners = banners.filter(
        (b) => b.placement === 'Hero' && b.active && (b.img || b.video),
    );
    const heroSlider = useHeroSlider(heroBanners);

    // The home page only previews a handful of featured packages; the full,
    // filterable list lives on /packages.
    const previewPackages = packages.slice(0, HOME_PACKAGE_LIMIT);

    return (
        <>
            <Head title="Travels Point — Explore the world, tailor-made" />

            {/* ===== HERO ===== */}
            {/* Mobile: the active image sits in normal flow at its natural
                aspect ratio — the WHOLE image is shown, uncropped (the solid
                header above it means no overlap). Desktop (md+): a fixed band
                where images fill with `object-cover`, cropped like GT. */}
            <section
                className="brand-gradient relative overflow-hidden md:h-[68svh] lg:h-[80svh]"
                onMouseEnter={() => heroSlider.setPaused(true)}
                onMouseLeave={() => heroSlider.setPaused(false)}
            >
                {heroBanners.length > 0 ? (
                    heroBanners.map((b, i) => {
                        const active = i === heroSlider.index;
                        const cls = cn(
                            'block w-full object-center transition-opacity duration-1000 ease-in-out',
                            active
                                ? 'relative h-auto opacity-100 md:absolute md:inset-0 md:size-full md:object-cover'
                                : 'absolute inset-0 size-full object-cover opacity-0',
                        );

                        return b.video ? (
                            <video
                                key={b.id}
                                src={b.video ?? undefined}
                                poster={b.img ?? undefined}
                                muted
                                loop
                                playsInline
                                autoPlay
                                className={cls}
                            />
                        ) : (
                            <img
                                key={b.id}
                                src={b.img ?? ''}
                                alt=""
                                draggable={false}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                className={cls}
                            />
                        );
                    })
                ) : (
                    <div className="min-h-[56svh] w-full" />
                )}

                {/* Light scrim so the white text stays legible on any image. */}
                <div className="pointer-events-none absolute inset-0 bg-black/30" />

                {/* Centered text overlay. */}
                <div
                    data-stagger
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center sm:px-10"
                >
                    <span
                        key={heroWord}
                        className="animate-in fade-in slide-in-from-bottom-2 block -rotate-2 font-script text-[clamp(28px,5vw,58px)] leading-none font-semibold text-gold duration-700 [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]"
                    >
                        {heroWords[heroWord]}
                    </span>

                    <h1 className="-mt-1 font-serif text-[clamp(36px,7vw,92px)] leading-[0.98] font-semibold tracking-[-0.015em] text-white [text-shadow:0_3px_22px_rgba(0,0,0,0.5)]">
                        Explore the world
                    </h1>

                    <p className="mt-4 max-w-[560px] text-[clamp(13px,1.4vw,17px)] leading-[1.6] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
                        Discover unforgettable journeys, exclusive tour packages
                        and personalized travel experiences — designed end to
                        end by Travels Point, people who know the world.
                    </p>
                </div>

                {/* Slider controls. */}
                <HeroControls state={heroSlider} />
            </section>

            <div className="relative z-10 bg-background">
                {/* ===== WHY TRAVELS POINT ===== */}
                <Section bg="surface">
                    <SectionHeading
                        eyebrow="Why Travels Point"
                        title="Travel with people who sweat the details"
                        subtitle="From the first spark of an idea to the flight home, we obsess over the moments that turn a trip into the trip."
                        reveal
                    />
                    <div
                        data-stagger
                        className="mt-12 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {features.map((f) => (
                            <article
                                key={f.title}
                                className="group rounded-card border border-border bg-surface p-[26px] shadow-[var(--shadow-sm)] transition hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[var(--shadow-md)]"
                            >
                                <IconTile
                                    icon={f.icon}
                                    iconSize={27}
                                    className="mb-5 transition group-hover:scale-110 group-hover:-rotate-6"
                                />
                                <h3 className="text-[19px] font-bold text-foreground">
                                    {f.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-[1.65] text-soft">
                                    {f.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </Section>

                {/* ===== OFFERS & PROMOTIONS ===== */}
                {offerCount > 0 && (
                    <Section id="offers" bg="muted">
                        <div
                            data-reveal
                            className="flex flex-col items-center gap-5 text-center"
                        >
                            <div className="max-w-[640px]">
                                <Eyebrow
                                    icon="local_fire_department"
                                    tone="green"
                                >
                                    Offers & Promotions
                                </Eyebrow>
                                <h2 className="mt-4 font-serif text-[clamp(32px,4.6vw,54px)] leading-[1.05] font-semibold tracking-tight text-foreground">
                                    Limited-time escapes, curated for now
                                </h2>
                            </div>
                        </div>

                        <div data-reveal className="mx-auto mt-10 max-w-4xl">
                                <div className="overflow-hidden rounded-panel shadow-[var(--shadow-md)]">
                                    <div
                                        className="flex transition-transform duration-700 ease-fluid"
                                        style={{
                                            transform: `translateX(-${offerIndex * 100}%)`,
                                        }}
                                    >
                                        {offers.map((o) => (
                                            <div
                                                key={o.id}
                                                className="flex w-full shrink-0 flex-col overflow-hidden md:min-h-110 md:flex-row md:items-stretch"
                                            >
                                                <div className="relative flex shrink-0 items-center justify-center overflow-hidden bg-muted md:w-80">
                                                    {o.img ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setOfferPreview({
                                                                    src: o.img!,
                                                                    title: o.title,
                                                                })
                                                            }
                                                            aria-label={`View full poster for ${o.title}`}
                                                            className="group relative flex size-full min-h-72 cursor-zoom-in items-center justify-center overflow-hidden md:min-h-0"
                                                        >
                                                            {/* Blurred copy fills the panel so the whole
                                                                poster shows (object-contain) with no flat
                                                                bands, whatever its aspect ratio. */}
                                                            <img
                                                                src={o.img}
                                                                alt=""
                                                                aria-hidden
                                                                className="absolute inset-0 size-full scale-110 object-cover blur-2xl"
                                                            />
                                                            <img
                                                                src={o.img}
                                                                alt={o.title}
                                                                className="relative z-10 mx-auto block max-h-105 w-auto max-w-[90%] object-contain shadow-[var(--shadow-md)] transition-transform duration-500 ease-fluid group-hover:scale-105"
                                                            />
                                                            <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition duration-300 group-hover:bg-ink/25 group-hover:opacity-100">
                                                                <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-[13px] font-bold text-ink shadow-[var(--shadow-md)]">
                                                                    <MaterialSymbol
                                                                        name="zoom_in"
                                                                        size={18}
                                                                    />
                                                                    View poster
                                                                </span>
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <GradientThumb
                                                            tint0={o.tint0}
                                                            tint1={o.tint1}
                                                            rounded="rounded-none"
                                                            className="h-64 w-full md:h-full md:min-h-105"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col justify-center bg-surface p-[clamp(26px,3.5vw,42px)]">
                                                    <Chip
                                                        icon="schedule"
                                                        tone="green"
                                                        className="w-fit"
                                                    >
                                                        {o.status}
                                                    </Chip>
                                                    <h3 className="mt-4 font-serif text-[clamp(28px,3.4vw,40px)] leading-[1.08] font-semibold text-foreground">
                                                        {o.title}
                                                    </h3>
                                                    <p className="mt-3 text-[16px] leading-[1.65] text-soft">
                                                        {o.description}
                                                    </p>
                                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-border pt-6 sm:grid-cols-2">
                                                        {offerPerks.map(
                                                            (perk) => (
                                                                <span
                                                                    key={perk}
                                                                    className="flex items-center gap-2 text-[14.5px] font-medium text-foreground"
                                                                >
                                                                    <MaterialSymbol
                                                                        name="check_circle"
                                                                        size={18}
                                                                        fill
                                                                        className="shrink-0 text-green"
                                                                    />
                                                                    {perk}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                                                        <Stars rating={5} size={16} />
                                                        <span className="text-[14px] font-semibold text-foreground">
                                                            4.9/5
                                                        </span>
                                                        <span className="text-[14px] text-soft">
                                                            from 2,400+ reviews
                                                        </span>
                                                    </div>
                                                    <CtaButton
                                                        asChild
                                                        variant="primary"
                                                        size="md"
                                                        className="mt-6 w-fit"
                                                    >
                                                        <Link
                                                            href={
                                                                o.cta_url ||
                                                                '/contact'
                                                            }
                                                        >
                                                            {o.cta}
                                                            <MaterialSymbol
                                                                name="arrow_forward"
                                                                size={18}
                                                            />
                                                        </Link>
                                                    </CtaButton>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {offerCount > 1 && (
                                    <div className="mt-5 flex items-center justify-center gap-2.5">
                                        <CarouselArrow
                                            dir="prev"
                                            onClick={() =>
                                                setOfferIndex(
                                                    (i) =>
                                                        (i - 1 + offerCount) %
                                                        offerCount,
                                                )
                                            }
                                        />
                                        <div className="flex gap-2">
                                            {offers.map((o, i) => (
                                                <button
                                                    key={o.id}
                                                    type="button"
                                                    aria-label={`Offer ${i + 1}`}
                                                    onClick={() =>
                                                        setOfferIndex(i)
                                                    }
                                                    className={cn(
                                                        'h-2.5 rounded-full transition-all',
                                                        i === offerIndex
                                                            ? 'w-7 bg-primary'
                                                            : 'w-2.5 bg-border-strong',
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <CarouselArrow
                                            dir="next"
                                            onClick={() =>
                                                setOfferIndex(
                                                    (i) => (i + 1) % offerCount,
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                    </Section>
                )}

                {/* ===== OFFER POSTER LIGHTBOX ===== */}
                {offerPreview && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={offerPreview.title}
                        onClick={() => setOfferPreview(null)}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
                    >
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={() => setOfferPreview(null)}
                            className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                        >
                            <MaterialSymbol name="close" size={24} />
                        </button>
                        <img
                            src={offerPreview.src}
                            alt={offerPreview.title}
                            onClick={(e) => e.stopPropagation()}
                            className="max-h-[90vh] w-auto max-w-[92vw] rounded-card object-contain shadow-[var(--shadow-lg)]"
                        />
                    </div>
                )}

                {/* ===== POPULAR TOUR PACKAGES ===== */}
                <Section id="packages" bg="surface">
                    <SectionHeading
                        eyebrow="Popular Tour Packages"
                        title="Itineraries our travelers love most"
                        reveal
                    />
                    {previewPackages.length === 0 ? (
                        <p className="mt-12 text-center text-[15.5px] text-soft">
                            No packages just yet — check back soon or{' '}
                            <Link
                                href="/contact"
                                className="font-bold text-primary hover:underline"
                            >
                                ask us to craft one
                            </Link>
                            .
                        </p>
                    ) : (
                        <div
                            data-stagger
                            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {previewPackages.map((p) => (
                                <article
                                    key={p.id}
                                    className="flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-sm)] transition hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
                                >
                                    <div className="relative h-[200px] overflow-hidden">
                                        <GradientThumb
                                            tint0={p.tint0}
                                            tint1={p.tint1}
                                            img={p.img}
                                            rounded="rounded-none"
                                            className="h-full"
                                        />
                                        <Chip
                                            icon="schedule"
                                            tone="light"
                                            className="absolute top-3.5 left-3.5"
                                        >
                                            {p.duration}
                                        </Chip>
                                        <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-full bg-ink/55 px-2.5 py-1.5 text-[12px] font-bold text-white backdrop-blur">
                                            <MaterialSymbol
                                                name="star"
                                                size={14}
                                                fill
                                                className="text-gold"
                                            />
                                            {p.rating.toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-[22px]">
                                        <p className="flex items-center gap-1.5 text-[13.5px] text-soft">
                                            <MaterialSymbol
                                                name="location_on"
                                                size={15}
                                                className="text-primary"
                                            />
                                            {p.location}
                                        </p>
                                        <h3 className="mt-1 text-[20px] font-bold text-foreground">
                                            {p.title}
                                        </h3>
                                        <ul className="mt-3 flex flex-wrap gap-1.5">
                                            {p.services.slice(0, 4).map((s) => (
                                                <li
                                                    key={s}
                                                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-soft"
                                                >
                                                    <MaterialSymbol
                                                        name="check_circle"
                                                        size={14}
                                                        className="text-primary-deep"
                                                    />
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                                            <p className="text-[13.5px] text-soft">
                                                from{' '}
                                                <span className="text-[22px] font-extrabold text-foreground">
                                                    {formatINR(p.price)}
                                                </span>
                                            </p>
                                            <CtaButton
                                                asChild
                                                variant="primary"
                                                size="sm"
                                            >
                                                <Link
                                                    href={`/contact?destination=${encodeURIComponent(p.location)}`}
                                                >
                                                    View
                                                    <MaterialSymbol
                                                        name="arrow_forward"
                                                        size={16}
                                                    />
                                                </Link>
                                            </CtaButton>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                    <div className="mt-12 flex justify-center">
                        <CtaButton asChild variant="primary" size="md">
                            <Link href="/packages">
                                View all packages
                                <MaterialSymbol
                                    name="arrow_forward"
                                    size={18}
                                />
                            </Link>
                        </CtaButton>
                    </div>
                </Section>

                {/* ===== TRAVEL GALLERY ===== */}
                {gallery.length > 0 && (
                    <Section bg="muted">
                        <div
                            data-reveal
                            className="flex flex-wrap items-end justify-between gap-5"
                        >
                            <div>
                                <Eyebrow>Travel Gallery</Eyebrow>
                                <h2 className="mt-4 font-serif text-[clamp(32px,4.6vw,54px)] leading-[1.05] font-semibold tracking-tight text-foreground">
                                    Moments from the journey
                                </h2>
                            </div>
                        </div>
                        <div
                            data-stagger
                            className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4"
                        >
                            {gallery.slice(0, HOME_GALLERY_LIMIT).map((g) => (
                                <figure
                                    key={g.id}
                                    className="group relative aspect-square overflow-hidden rounded-card shadow-[var(--shadow-sm)]"
                                >
                                    <GradientThumb
                                        tint0={g.tint0}
                                        tint1={g.tint1}
                                        img={g.img}
                                        rounded="rounded-none"
                                        className="h-full transition-transform duration-700 group-hover:scale-[1.09]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(6,18,30,0.62)_100%)]" />
                                    <Chip
                                        tone="light"
                                        className="absolute top-2.5 left-2.5"
                                    >
                                        {g.category}
                                    </Chip>
                                    <figcaption className="absolute right-3.5 bottom-3.5 left-3.5 text-[14px] leading-[1.25] font-bold text-white">
                                        {g.topic}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                        {gallery.length > HOME_GALLERY_LIMIT && (
                            <div className="mt-12 flex justify-center">
                                <CtaButton asChild variant="primary" size="md">
                                    <Link href="/gallery">
                                        View all photos
                                        <MaterialSymbol
                                            name="arrow_forward"
                                            size={18}
                                        />
                                    </Link>
                                </CtaButton>
                            </div>
                        )}
                    </Section>
                )}

                {/* ===== FROM THE BLOG ===== */}
                {posts.length > 0 && (
                    <Section bg="surface">
                        <div
                            data-reveal
                            className="flex flex-wrap items-end justify-between gap-5"
                        >
                            <div>
                                <Eyebrow icon="article">From the blog</Eyebrow>
                                <h2 className="mt-4 font-serif text-[clamp(32px,4.6vw,54px)] leading-[1.05] font-semibold tracking-tight text-foreground">
                                    Travel stories & guides
                                </h2>
                            </div>
                            <CtaButton asChild variant="outline" size="md">
                                <Link href="/blog">
                                    View all stories
                                    <MaterialSymbol
                                        name="arrow_forward"
                                        size={18}
                                    />
                                </Link>
                            </CtaButton>
                        </div>

                        <div
                            data-stagger
                            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </Section>
                )}

                {/* ===== TESTIMONIALS ===== */}
                {tCount > 0 && (
                    <section className="relative overflow-hidden brand-gradient-deep px-5 py-[clamp(64px,9vw,120px)] sm:px-8">
                        <span className="pointer-events-none absolute top-0 right-6 font-serif text-[340px] leading-none text-white/5 select-none">
                            &rdquo;
                        </span>
                        <div className="tp-float pointer-events-none absolute bottom-[5%] left-[5%] size-[130px] rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.45),transparent_70%)] blur-[6px]" />

                        <Container width="default" className="relative">
                            <SectionHeading
                                eyebrow="Loved by travelers"
                                eyebrowIcon="favorite"
                                eyebrowTone="gold"
                                title="Stories worth the airfare"
                                invert
                                reveal
                            />
                            <div data-reveal className="mt-10">
                                <div className="overflow-hidden rounded-panel">
                                    <div
                                        className="flex transition-transform duration-700 ease-fluid"
                                        style={{
                                            transform: `translateX(-${tIndex * 100}%)`,
                                        }}
                                    >
                                        {testimonials.map((t) => (
                                            <figure
                                                key={t.id}
                                                className="w-full shrink-0 px-1.5"
                                            >
                                                <div className="rounded-panel border border-white/15 bg-[var(--glass-strong,rgba(255,255,255,0.82))] p-[clamp(28px,4vw,48px)] text-center shadow-[var(--shadow-lg)] backdrop-blur-lg">
                                                    <div className="mb-4 flex justify-center">
                                                        <Stars
                                                            rating={t.rating}
                                                            size={22}
                                                        />
                                                    </div>
                                                    <blockquote className="mx-auto max-w-[640px] font-serif text-[clamp(21px,2.6vw,30px)] leading-[1.4] font-medium text-foreground italic">
                                                        “{t.review}”
                                                    </blockquote>
                                                    <figcaption className="mt-6 flex items-center justify-center gap-3.5">
                                                        <span
                                                            className="flex size-[54px] items-center justify-center rounded-full font-serif text-[18px] font-extrabold text-white shadow-[var(--shadow-sm)]"
                                                            style={{
                                                                backgroundImage: `linear-gradient(135deg, ${t.tint0}, ${t.tint1})`,
                                                            }}
                                                        >
                                                            {t.name.charAt(0)}
                                                        </span>
                                                        <div className="text-left">
                                                            <p className="text-[16px] font-extrabold text-foreground">
                                                                {t.name}
                                                            </p>
                                                            <p className="text-[13px] font-semibold text-faint">
                                                                {t.location}
                                                            </p>
                                                        </div>
                                                    </figcaption>
                                                </div>
                                            </figure>
                                        ))}
                                    </div>
                                </div>
                                {tCount > 1 && (
                                    <div className="mt-6 flex items-center justify-center gap-4.5">
                                        <CarouselArrow
                                            dir="prev"
                                            invert
                                            onClick={() =>
                                                setTIndex(
                                                    (i) =>
                                                        (i - 1 + tCount) %
                                                        tCount,
                                                )
                                            }
                                        />
                                        <div className="flex gap-2">
                                            {testimonials.map((t, i) => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    aria-label={`Testimonial ${i + 1}`}
                                                    onClick={() => setTIndex(i)}
                                                    className={cn(
                                                        'h-2.5 rounded-full transition-all',
                                                        i === tIndex
                                                            ? 'w-7 bg-primary'
                                                            : 'w-2.5 bg-white/30',
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <CarouselArrow
                                            dir="next"
                                            invert
                                            onClick={() =>
                                                setTIndex(
                                                    (i) => (i + 1) % tCount,
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </Container>
                    </section>
                )}

                {/* ===== STATS ===== */}
                <Section bg="surface" spacing="compact">
                    <div
                        data-stagger
                        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-card border border-border bg-surface p-[30px] text-center shadow-[var(--shadow-sm)]"
                            >
                                <IconTile
                                    icon={s.icon}
                                    iconSize={26}
                                    className="mx-auto mb-4"
                                />
                                <p className="bg-gradient-to-br from-primary-deep to-gold bg-clip-text text-[clamp(38px,5vw,58px)] leading-none font-extrabold tracking-[-0.02em] text-transparent">
                                    <CountUp value={s.value} />
                                </p>
                                <p className="mt-2.5 text-[14.5px] font-bold text-soft">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ===== CTA BAND ===== */}
                <Section
                    bg="surface"
                    spacing="none"
                    className="pb-[clamp(56px,8vw,96px)]"
                >
                    <div
                        data-reveal
                        className="relative overflow-hidden rounded-panel brand-gradient-cta px-[clamp(24px,5vw,72px)] py-[clamp(44px,7vw,84px)] text-center"
                    >
                        <div className="pointer-events-none absolute inset-0 brand-hatch" />
                        <div className="tp-float pointer-events-none absolute -top-8 -right-8 size-[280px] rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.4),transparent_70%)] blur-[8px]" />
                        <MaterialSymbol
                            name="flight_takeoff"
                            size={34}
                            className="tp-float2 pointer-events-none absolute bottom-6 left-[8%] text-white/20"
                        />
                        <div className="relative mx-auto max-w-[1000px]">
                            <Eyebrow
                                icon="auto_awesome"
                                tone="gold"
                                className="justify-center"
                            >
                                Your next chapter
                            </Eyebrow>
                            <h2 className="mt-4 font-serif text-[clamp(36px,5.6vw,68px)] leading-[1.05] font-semibold text-white">
                                Ready For Your Next Adventure?
                            </h2>
                            <p className="mx-auto mt-4 max-w-[620px] text-[clamp(15px,1.5vw,18px)] leading-[1.65] text-white/85">
                                Tell us where you have always wanted to go. We
                                will craft the itinerary, handle every booking
                                and have you packed in no time.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                                <CtaButton asChild variant="white" size="lg">
                                    <Link href="/contact">
                                        Plan My Trip
                                        <MaterialSymbol
                                            name="arrow_forward"
                                            size={18}
                                        />
                                    </Link>
                                </CtaButton>
                                <CtaButton asChild variant="ghost" size="lg">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <MaterialSymbol name="chat" size={20} />
                                        Chat on WhatsApp
                                    </a>
                                </CtaButton>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

function CarouselArrow({
    dir,
    onClick,
    invert = false,
}: {
    dir: 'prev' | 'next';
    onClick: () => void;
    invert?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={dir === 'prev' ? 'Previous' : 'Next'}
            className={cn(
                'flex size-[46px] items-center justify-center rounded-full backdrop-blur transition hover:-translate-y-0.5',
                invert
                    ? 'border border-white/25 bg-white/10 text-white'
                    : 'bg-[var(--glass-strong,rgba(255,255,255,0.82))] text-foreground shadow-[var(--shadow-md)]',
            )}
        >
            <MaterialSymbol
                name={dir === 'prev' ? 'arrow_back' : 'arrow_forward'}
                size={22}
            />
        </button>
    );
}

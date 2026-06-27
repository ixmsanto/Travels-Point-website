import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import GradientThumb from '@/components/gradient-thumb';
import MaterialSymbol from '@/components/material-symbol';
import { Eyebrow, SectionHeading } from '@/components/public/section-heading';
import { formatINR } from '@/lib/currency';
import { cn } from '@/lib/utils';
import type {
    Banner,
    Destination,
    GalleryItem,
    Offer,
    PackageRegion,
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
};

const packageRegions = ['All', 'India', 'International'] as const;
type PackageTab = (typeof packageRegions)[number];

const features = [
    {
        icon: 'tune',
        title: 'Tailor-made, never templated',
        text: 'Every itinerary is built around you — your pace, your taste, your budget. No two trips are the same.',
    },
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
        icon: 'hotel',
        title: 'Hand-picked stays',
        text: 'We have slept in the rooms. We know which café has the view and which floor to ask for.',
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

const tripTypes = ['Honeymoon', 'Family', 'Group tour', 'Solo', 'Corporate'];
const budgets = ['Under $2k', '$2k – $5k', '$5k – $10k', '$10k+'];

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
                        i < Math.round(rating) ? 'text-gold' : 'text-border-strong'
                    }
                />
            ))}
        </span>
    );
}

export default function Home({
    banners,
    destinations,
    packages,
    offers,
    testimonials,
    gallery = [],
}: Props) {
    const [destination, setDestination] = useState('');
    const [offerView, setOfferView] = useState<'carousel' | 'grid'>('carousel');
    const [offerIndex, setOfferIndex] = useState(0);
    const [tIndex, setTIndex] = useState(0);
    const [pkgTab, setPkgTab] = useState<PackageTab>('All');
    const [heroIndex, setHeroIndex] = useState(0);

    const offerCount = offers.length;
    const tCount = testimonials.length;

    // Active Hero-placement banners with an image drive the hero background.
    const heroBanners = banners.filter(
        (b) => b.placement === 'Hero' && b.active && b.img,
    );

    // Cross-fade through the hero banners every 6s when more than one exists.
    useEffect(() => {
        if (heroBanners.length < 2) {
            return;
        }

        const id = setInterval(() => {
            setHeroIndex((i) => (i + 1) % heroBanners.length);
        }, 6000);

        return () => clearInterval(id);
    }, [heroBanners.length]);

    const visiblePackages =
        pkgTab === 'All'
            ? packages
            : packages.filter((p) => p.region === (pkgTab as PackageRegion));

    return (
        <>
            <Head title="Travels Point — Explore the world, tailor-made" />

            {/* ===== HERO ===== */}
            <section
                className="relative overflow-hidden"
                style={{
                    background:
                        'linear-gradient(150deg,#083b7c 0%,#0b4ea2 38%,#1565c5 70%,#2f8fd6 100%)',
                }}
            >
                {/* Admin-managed Hero banner images, cross-fading over the gradient. */}
                {heroBanners.map((b, i) => (
                    <div
                        key={b.id}
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                        style={{
                            backgroundImage: `url(${b.img})`,
                            opacity: i === heroIndex ? 1 : 0,
                        }}
                    />
                ))}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_22px)] opacity-50" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,28,0.45)_0%,rgba(4,16,28,0.28)_32%,rgba(4,16,28,0.7)_100%)]" />
                <div className="tp-float pointer-events-none absolute top-24 right-[8%] size-[200px] rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.55),transparent_70%)] blur-[6px]" />
                <div className="tp-float2 pointer-events-none absolute bottom-24 left-[6%] size-[140px] rounded-full bg-[radial-gradient(circle,rgba(91,155,255,0.5),transparent_70%)] blur-[4px]" />
                <MaterialSymbol
                    name="flight"
                    size={30}
                    className="tp-float pointer-events-none absolute top-28 left-[10%] text-white/30"
                />
                <MaterialSymbol
                    name="near_me"
                    size={26}
                    className="tp-float2 pointer-events-none absolute right-[12%] bottom-28 text-white/25"
                />

                <div
                    data-stagger
                    className="relative mx-auto flex min-h-[clamp(640px,93svh,940px)] max-w-[1240px] flex-col justify-center px-5 pt-24 pb-16 sm:px-8"
                >
                    <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/25 bg-white/15 px-[17px] py-2.5 text-[13px] font-semibold text-white backdrop-blur-md">
                        <Stars rating={5} size={15} />
                        Rated 4.9 / 5 · 24,000+ journeys crafted
                    </span>

                    <h1 className="mt-5.5 max-w-[14ch] font-serif text-[clamp(44px,7.2vw,88px)] leading-[1.02] font-semibold tracking-[-0.012em] text-white">
                        Explore The World With{' '}
                        <span className="text-gold italic">Travels Point</span>
                    </h1>

                    <p className="mt-6 max-w-[580px] text-[clamp(16px,1.6vw,20px)] leading-[1.65] text-white/90">
                        Discover unforgettable journeys, exclusive tour packages
                        and personalized travel experiences — designed end to end
                        by people who know the world.
                    </p>

                    <div className="mt-8.5 flex flex-wrap gap-3.5">
                        <Link
                            href="/#packages"
                            className="inline-flex items-center gap-2.5 rounded-[14px] bg-gradient-to-br from-primary to-primary-deep px-[30px] py-4 text-[16px] font-bold text-white shadow-[0_18px_40px_-16px_rgba(11,78,162,0.8)] transition hover:-translate-y-0.5 hover:brightness-110"
                        >
                            <MaterialSymbol name="luggage" size={20} />
                            Explore Packages
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 rounded-[14px] border border-white/40 bg-white/15 px-[30px] py-4 text-[16px] font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/25"
                        >
                            <MaterialSymbol name="chat_bubble" size={20} />
                            Contact Us
                        </Link>
                    </div>

                    {/* Search bar */}
                    <form
                        data-reveal
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.get(
                                '/contact',
                                destination ? { destination } : {},
                            );
                        }}
                        className="mt-11 grid grid-cols-2 gap-2.5 rounded-[22px] border border-white/40 bg-[var(--glass-strong,rgba(255,255,255,0.82))] p-4 shadow-[0_36px_70px_-28px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:grid-cols-3 lg:grid-cols-6"
                    >
                        <Field icon="place">
                            <input
                                list="dest-list"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Where to?"
                                className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-faint"
                            />
                            <datalist id="dest-list">
                                {destinations.map((d) => (
                                    <option key={d.id} value={d.name} />
                                ))}
                            </datalist>
                        </Field>
                        <Field icon="calendar_month">
                            <input
                                type="text"
                                onFocus={(e) => (e.target.type = 'date')}
                                placeholder="Travel dates"
                                className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-faint"
                            />
                        </Field>
                        <Field icon="group">
                            <select className="w-full bg-transparent text-[15px] font-semibold outline-none">
                                <option>2 Adults</option>
                                <option>1 Adult</option>
                                <option>Family (3–5)</option>
                                <option>Group (6+)</option>
                            </select>
                        </Field>
                        <Field icon="tune">
                            <select className="w-full bg-transparent text-[15px] font-semibold outline-none">
                                {tripTypes.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </Field>
                        <Field icon="payments">
                            <select className="w-full bg-transparent text-[15px] font-semibold outline-none">
                                {budgets.map((b) => (
                                    <option key={b}>{b}</option>
                                ))}
                            </select>
                        </Field>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 rounded-[13px] bg-gradient-to-br from-primary to-primary-deep px-4 py-3 text-[15px] font-bold text-white transition hover:brightness-110"
                        >
                            <MaterialSymbol name="search" size={20} />
                            Search
                        </button>
                    </form>

                    <div className="mt-10 flex flex-col items-center gap-1 self-center text-white/70">
                        <span className="text-[11px] tracking-[0.16em] uppercase">
                            Scroll
                        </span>
                        <MaterialSymbol
                            name="keyboard_arrow_down"
                            size={22}
                            className="tp-cue"
                        />
                    </div>
                </div>
            </section>

            {/* ===== WHY TRAVELS POINT ===== */}
            <section className="bg-background px-5 py-[clamp(64px,9vw,118px)] sm:px-8">
                <div className="mx-auto max-w-[1240px]">
                    <SectionHeading
                        eyebrow="Why Travels Point"
                        title="Travel with people who sweat the details"
                        subtitle="From the first spark of an idea to the flight home, we obsess over the moments that turn a trip into the trip."
                        reveal
                    />
                    <div
                        data-stagger
                        className="mt-12 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {features.map((f) => (
                            <article
                                key={f.title}
                                className="group rounded-[20px] border border-border bg-surface p-[26px] shadow-[var(--shadow-sm)] transition hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[var(--shadow-md)]"
                            >
                                <span className="mb-5 flex size-[54px] items-center justify-center rounded-[15px] bg-gradient-to-br from-primary-soft to-gold-soft text-primary-deep transition group-hover:-rotate-6 group-hover:scale-110">
                                    <MaterialSymbol name={f.icon} size={27} />
                                </span>
                                <h3 className="text-[19px] font-bold text-foreground">
                                    {f.title}
                                </h3>
                                <p className="mt-2 text-[15px] leading-[1.65] text-soft">
                                    {f.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURED DESTINATIONS ===== */}
            <section
                id="destinations"
                className="scroll-mt-20 bg-bg-2 px-5 py-[clamp(64px,9vw,118px)] sm:px-8"
            >
                <div className="mx-auto max-w-[1240px]">
                    <div
                        data-reveal
                        className="flex flex-wrap items-end justify-between gap-5"
                    >
                        <div className="max-w-[620px]">
                            <Eyebrow>Featured Destinations</Eyebrow>
                            <h2 className="mt-4 font-serif text-[clamp(32px,4.6vw,54px)] leading-[1.05] font-semibold tracking-tight text-foreground">
                                Where will you wake up next?
                            </h2>
                        </div>
                        <Link
                            href="/#packages"
                            className="inline-flex items-center gap-2 rounded-xl border border-border-strong bg-surface px-5 py-3 text-[14.5px] font-bold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[var(--shadow-md)]"
                        >
                            View all packages
                            <MaterialSymbol
                                name="arrow_forward"
                                size={18}
                                className="text-primary-deep"
                            />
                        </Link>
                    </div>

                    <div
                        data-stagger
                        className="mt-12 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {destinations.map((d) => (
                            <article
                                key={d.id}
                                className="group overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-sm)] transition hover:-translate-y-2 hover:border-primary/30 hover:shadow-[var(--shadow-lg)]"
                            >
                                <div className="relative h-[218px] overflow-hidden">
                                    <GradientThumb
                                        tint0={d.tint0}
                                        tint1={d.tint1}
                                        img={d.img}
                                        rounded="rounded-none"
                                        className="h-full transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,30,0.05)_40%,rgba(6,18,30,0.55)_100%)]" />
                                    <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-[12px] font-bold text-[#1b2a41] backdrop-blur">
                                        <MaterialSymbol
                                            name="place"
                                            size={14}
                                            className="text-primary-deep"
                                        />
                                        {d.tag}
                                    </span>
                                    <div className="absolute right-5 bottom-4 left-5 text-white">
                                        <p className="flex items-center gap-1 text-[12.5px] font-semibold opacity-90">
                                            <MaterialSymbol
                                                name="location_on"
                                                size={14}
                                            />
                                            {d.country}
                                        </p>
                                        <h3 className="font-serif text-[26px] leading-none font-semibold">
                                            {d.name}
                                        </h3>
                                    </div>
                                </div>
                                <div className="p-[22px]">
                                    <p className="line-clamp-2 text-[14.5px] leading-[1.6] text-soft">
                                        {d.blurb}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <p className="text-[15px] text-soft">
                                            from{' '}
                                            <span className="text-[21px] font-extrabold text-foreground">
                                                {formatINR(d.price)}
                                            </span>{' '}
                                            / person
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-primary-deep transition-all hover:gap-2.5"
                                        >
                                            Explore
                                            <MaterialSymbol
                                                name="arrow_forward"
                                                size={16}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OFFERS & PROMOTIONS ===== */}
            {offerCount > 0 && (
                <section
                    id="offers"
                    className="scroll-mt-20 bg-background px-5 py-[clamp(64px,9vw,118px)] sm:px-8"
                >
                    <div className="mx-auto max-w-[1240px]">
                        <div
                            data-reveal
                            className="flex flex-wrap items-end justify-between gap-5"
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
                            <div className="flex gap-1.5 rounded-[13px] border border-border bg-surface-2 p-1.5">
                                {(['carousel', 'grid'] as const).map((v) => (
                                    <button
                                        key={v}
                                        type="button"
                                        onClick={() => setOfferView(v)}
                                        className={cn(
                                            'inline-flex items-center gap-1.5 rounded-[9px] px-4 py-2.5 text-[13.5px] font-bold capitalize transition',
                                            offerView === v
                                                ? 'bg-primary text-white'
                                                : 'text-soft hover:text-primary',
                                        )}
                                    >
                                        <MaterialSymbol
                                            name={
                                                v === 'carousel'
                                                    ? 'view_carousel'
                                                    : 'grid_view'
                                            }
                                            size={18}
                                        />
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {offerView === 'carousel' ? (
                            <div data-reveal className="mt-10">
                                <div className="overflow-hidden rounded-[26px] shadow-[var(--shadow-md)]">
                                    <div
                                        className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                                        style={{
                                            transform: `translateX(-${offerIndex * 100}%)`,
                                        }}
                                    >
                                        {offers.map((o) => (
                                            <div
                                                key={o.id}
                                                className="grid w-full shrink-0 grid-cols-1 md:grid-cols-2"
                                            >
                                                <div className="relative min-h-[300px]">
                                                    <GradientThumb
                                                        tint0={o.tint0}
                                                        tint1={o.tint1}
                                                        img={o.img}
                                                        rounded="rounded-none"
                                                        className="h-full min-h-[300px]"
                                                    />
                                                    <span className="absolute top-5 left-5 flex size-[84px] flex-col items-center justify-center rounded-full bg-green text-white shadow-[0_12px_26px_-10px_rgba(76,175,80,0.7)]">
                                                        <span className="text-[24px] leading-none font-extrabold">
                                                            {o.discount}%
                                                        </span>
                                                        <span className="text-[10px] font-extrabold tracking-[0.14em]">
                                                            OFF
                                                        </span>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col justify-center bg-surface p-[clamp(26px,3.5vw,42px)]">
                                                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-green-soft px-3.5 py-1.5 text-[12px] font-bold text-green-deep">
                                                        <MaterialSymbol
                                                            name="schedule"
                                                            size={14}
                                                        />
                                                        {o.status}
                                                    </span>
                                                    <h3 className="mt-4 font-serif text-[clamp(28px,3.4vw,40px)] leading-[1.08] font-semibold text-foreground">
                                                        {o.title}
                                                    </h3>
                                                    <p className="mt-3 text-[16px] leading-[1.65] text-soft">
                                                        {o.description}
                                                    </p>
                                                    <p className="mt-4.5 flex items-center gap-2 text-[14px] text-soft">
                                                        <MaterialSymbol
                                                            name="event_busy"
                                                            size={18}
                                                            className="text-gold"
                                                        />
                                                        Valid until{' '}
                                                        {new Date(
                                                            o.expiry,
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            },
                                                        )}
                                                    </p>
                                                    <Link
                                                        href={o.cta_url || '/contact'}
                                                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-[13px] bg-gradient-to-br from-primary to-primary-deep px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_30px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                                                    >
                                                        {o.cta}
                                                        <MaterialSymbol
                                                            name="arrow_forward"
                                                            size={18}
                                                        />
                                                    </Link>
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
                        ) : (
                            <div
                                data-stagger
                                className="mt-10 grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3"
                            >
                                {offers.map((o) => (
                                    <article
                                        key={o.id}
                                        className="flex flex-col overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-sm)] transition hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)]"
                                    >
                                        <div className="relative h-[170px]">
                                            <GradientThumb
                                                tint0={o.tint0}
                                                tint1={o.tint1}
                                                img={o.img}
                                                rounded="rounded-none"
                                                className="h-full"
                                            />
                                            <span className="absolute top-3.5 right-3.5 rounded-full bg-green px-3 py-1.5 text-[13px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(76,175,80,0.7)]">
                                                {o.discount}% OFF
                                            </span>
                                        </div>
                                        <div className="flex flex-1 flex-col p-[22px]">
                                            <h3 className="font-serif text-[20px] font-semibold text-foreground">
                                                {o.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-2 flex-1 text-[14.5px] leading-[1.6] text-soft">
                                                {o.description}
                                            </p>
                                            <Link
                                                href={o.cta_url || '/contact'}
                                                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-gold to-[#d96b00] py-3 text-[14.5px] font-bold text-white shadow-[0_10px_22px_-12px_rgba(245,124,0,0.7)] transition hover:-translate-y-0.5"
                                            >
                                                {o.cta}
                                                <MaterialSymbol
                                                    name="arrow_forward"
                                                    size={16}
                                                />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ===== POPULAR TOUR PACKAGES ===== */}
            <section
                id="packages"
                className="scroll-mt-20 bg-bg-2 px-5 py-[clamp(64px,9vw,118px)] sm:px-8"
            >
                <div className="mx-auto max-w-[1240px]">
                    <SectionHeading
                        eyebrow="Popular Tour Packages"
                        title="Itineraries our travelers love most"
                        reveal
                    />
                    <div
                        data-reveal
                        className="mt-9 flex justify-center"
                    >
                        <div className="inline-flex gap-1.5 rounded-[14px] border border-border bg-surface-2 p-1.5">
                            {packageRegions.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setPkgTab(tab)}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 rounded-[10px] px-5 py-2.5 text-[14px] font-bold transition',
                                        pkgTab === tab
                                            ? 'bg-primary text-white shadow-[0_10px_22px_-14px_var(--ring-glow)]'
                                            : 'text-soft hover:text-primary',
                                    )}
                                >
                                    {tab === 'India' && (
                                        <MaterialSymbol name="place" size={17} />
                                    )}
                                    {tab === 'International' && (
                                        <MaterialSymbol name="public" size={17} />
                                    )}
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    {visiblePackages.length === 0 ? (
                        <p className="mt-12 text-center text-[15.5px] text-soft">
                            No {pkgTab.toLowerCase()} packages just yet — check
                            back soon or{' '}
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
                        {visiblePackages.map((p) => (
                            <article
                                key={p.id}
                                className="flex flex-col overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-sm)] transition hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
                            >
                                <div className="relative h-[200px] overflow-hidden">
                                    <GradientThumb
                                        tint0={p.tint0}
                                        tint1={p.tint1}
                                        img={p.img}
                                        rounded="rounded-none"
                                        className="h-full"
                                    />
                                    <span className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-bold text-[#1b2a41] backdrop-blur">
                                        <MaterialSymbol name="schedule" size={14} />
                                        {p.duration}
                                    </span>
                                    <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 rounded-full bg-[#1b2a41]/55 px-2.5 py-1.5 text-[12px] font-bold text-white backdrop-blur">
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
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-primary to-primary-deep px-[18px] py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                                        >
                                            View
                                            <MaterialSymbol
                                                name="arrow_forward"
                                                size={16}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    )}
                    <div className="mt-12 flex justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-primary to-primary-deep px-[30px] py-3.5 text-[15.5px] font-bold text-white shadow-[0_16px_34px_-16px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                        >
                            View all packages
                            <MaterialSymbol name="arrow_forward" size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== TRAVEL GALLERY ===== */}
            {gallery.length > 0 && (
                <section className="bg-background px-5 py-[clamp(64px,9vw,118px)] sm:px-8">
                    <div className="mx-auto max-w-[1240px]">
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
                            {gallery.map((g) => (
                                <figure
                                    key={g.id}
                                    className="group relative aspect-square overflow-hidden rounded-[18px] shadow-[var(--shadow-sm)]"
                                >
                                    <GradientThumb
                                        tint0={g.tint0}
                                        tint1={g.tint1}
                                        img={g.img}
                                        rounded="rounded-none"
                                        className="h-full transition-transform duration-700 group-hover:scale-[1.09]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(6,18,30,0.62)_100%)]" />
                                    <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold text-[#1b2a41]">
                                        {g.category}
                                    </span>
                                    <figcaption className="absolute right-3.5 bottom-3.5 left-3.5 text-[14px] leading-[1.25] font-bold text-white">
                                        {g.topic}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== TESTIMONIALS ===== */}
            {tCount > 0 && (
                <section
                    className="relative overflow-hidden px-5 py-[clamp(64px,9vw,120px)] sm:px-8"
                    style={{
                        background:
                            'linear-gradient(165deg,#062a52 0%,#083b7c 55%,#0b4ea2 100%)',
                    }}
                >
                    <span className="pointer-events-none absolute top-0 right-6 font-serif text-[340px] leading-none text-white/5 select-none">
                        &rdquo;
                    </span>
                    <div className="tp-float pointer-events-none absolute bottom-[5%] left-[5%] size-[130px] rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.45),transparent_70%)] blur-[6px]" />

                    <div className="relative mx-auto max-w-[1240px]">
                        <SectionHeading
                            eyebrow="Loved by travelers"
                            eyebrowIcon="favorite"
                            eyebrowTone="gold"
                            title="Stories worth the airfare"
                            invert
                            reveal
                        />
                        <div data-reveal className="mt-10">
                            <div className="overflow-hidden rounded-[26px]">
                                <div
                                    className="flex transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                                    style={{
                                        transform: `translateX(-${tIndex * 100}%)`,
                                    }}
                                >
                                    {testimonials.map((t) => (
                                        <figure
                                            key={t.id}
                                            className="w-full shrink-0 px-1.5"
                                        >
                                            <div className="rounded-[24px] border border-white/15 bg-[var(--glass-strong,rgba(255,255,255,0.82))] p-[clamp(28px,4vw,48px)] text-center shadow-[var(--shadow-lg)] backdrop-blur-2xl">
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
                                                (i) => (i - 1 + tCount) % tCount,
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
                                            setTIndex((i) => (i + 1) % tCount)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== STATS ===== */}
            <section className="bg-background px-5 py-[clamp(56px,7vw,96px)] sm:px-8">
                <div
                    data-stagger
                    className="mx-auto grid max-w-[1140px] gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-[20px] border border-border bg-surface p-[30px] text-center shadow-[var(--shadow-sm)]"
                        >
                            <span className="mx-auto mb-4 flex size-[52px] items-center justify-center rounded-[14px] bg-gradient-to-br from-primary-soft to-gold-soft text-primary-deep">
                                <MaterialSymbol name={s.icon} size={26} />
                            </span>
                            <p className="bg-gradient-to-br from-primary-deep to-gold bg-clip-text text-[clamp(38px,5vw,58px)] leading-none font-extrabold tracking-[-0.02em] text-transparent">
                                {s.value}
                            </p>
                            <p className="mt-2.5 text-[14.5px] font-bold text-soft">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="px-5 pb-[clamp(56px,8vw,96px)] sm:px-8">
                <div
                    data-reveal
                    className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[30px] px-[clamp(24px,5vw,72px)] py-[clamp(44px,7vw,84px)] text-center"
                    style={{
                        background:
                            'linear-gradient(135deg,#083b7c 0%,#0b4ea2 50%,#1565c5 100%)',
                    }}
                >
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_22px)]" />
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
                            Tell us where you have always wanted to go. We will
                            craft the itinerary, handle every booking and have you
                            packed in no time.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-[14px] bg-white px-8 py-4 text-[16px] font-extrabold text-[#083b7c] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5"
                            >
                                Plan My Trip
                                <MaterialSymbol name="arrow_forward" size={18} />
                            </Link>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener"
                                className="inline-flex items-center gap-2 rounded-[14px] border border-white/40 bg-white/15 px-[30px] py-4 text-[16px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/25"
                            >
                                <MaterialSymbol name="chat" size={20} />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

const WHATSAPP = 'https://wa.me/97145550192';

function Field({ icon, children }: { icon: string; children: ReactNode }) {
    return (
        <label className="flex items-center gap-2 rounded-[13px] border border-border bg-surface-2 px-3 py-2.5">
            <MaterialSymbol
                name={icon}
                size={18}
                className="shrink-0 text-primary"
            />
            {children}
        </label>
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

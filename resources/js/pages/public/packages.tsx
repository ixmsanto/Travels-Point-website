import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import GradientThumb from '@/components/gradient-thumb';
import MaterialSymbol from '@/components/material-symbol';
import { Eyebrow } from '@/components/public/section-heading';
import { formatINR } from '@/lib/currency';
import { cn } from '@/lib/utils';
import type { Offer, PackageRegion, TourPackage } from '@/types';

type Props = {
    packages: TourPackage[];
    offers: Offer[];
};

const regions = ['All', 'India', 'International'] as const;
type RegionTab = (typeof regions)[number];

export default function Packages({ packages, offers }: Props) {
    const [tab, setTab] = useState<RegionTab>('All');

    const visible = useMemo(
        () =>
            tab === 'All'
                ? packages
                : packages.filter((p) => p.region === (tab as PackageRegion)),
        [packages, tab],
    );

    const liveOffer = offers[0];

    return (
        <>
            <Head title="Tour Packages — Travels Point" />

            {/* ===== HEADER ===== */}
            <section
                className="relative overflow-hidden px-5 pt-[clamp(56px,8vw,104px)] pb-[clamp(40px,6vw,72px)] sm:px-8"
                style={{
                    background:
                        'linear-gradient(150deg,#083b7c 0%,#0b4ea2 45%,#1565c5 100%)',
                }}
            >
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_22px)] opacity-50" />
                <div className="tp-float pointer-events-none absolute -top-6 right-[8%] size-[180px] rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.5),transparent_70%)] blur-[6px]" />
                <MaterialSymbol
                    name="luggage"
                    size={28}
                    className="tp-float2 pointer-events-none absolute bottom-10 left-[8%] text-white/25"
                />
                <div
                    data-reveal
                    className="relative mx-auto max-w-[1240px] text-center"
                >
                    <Eyebrow tone="light" className="justify-center">
                        Tour Packages
                    </Eyebrow>
                    <h1 className="mx-auto mt-4 max-w-[16ch] font-serif text-[clamp(38px,5.6vw,68px)] leading-[1.04] font-semibold tracking-tight text-white">
                        Every itinerary, ready to{' '}
                        <span className="text-gold italic">explore</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-[600px] text-[clamp(15px,1.5vw,18px)] leading-[1.7] text-white/85">
                        Hand-crafted journeys across India and beyond — flights,
                        stays, visas and transfers handled end to end. Filter by
                        region and find the trip that fits.
                    </p>
                </div>
            </section>

            {/* ===== PACKAGES GRID ===== */}
            <section className="bg-background px-5 py-[clamp(48px,7vw,96px)] sm:px-8">
                <div className="mx-auto max-w-[1240px]">
                    <div data-reveal className="flex justify-center">
                        <div className="inline-flex gap-1.5 rounded-[14px] border border-border bg-surface-2 p-1.5">
                            {regions.map((r) => (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setTab(r)}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 rounded-[10px] px-5 py-2.5 text-[14px] font-bold transition',
                                        tab === r
                                            ? 'bg-primary text-white shadow-[0_10px_22px_-14px_var(--ring-glow)]'
                                            : 'text-soft hover:text-primary',
                                    )}
                                >
                                    {r === 'India' && (
                                        <MaterialSymbol name="place" size={17} />
                                    )}
                                    {r === 'International' && (
                                        <MaterialSymbol name="public" size={17} />
                                    )}
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {visible.length === 0 ? (
                        <p className="mt-12 text-center text-[15.5px] text-soft">
                            No {tab.toLowerCase()} packages just yet — check back
                            soon or{' '}
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
                            {visible.map((p) => (
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
                                            <MaterialSymbol
                                                name="schedule"
                                                size={14}
                                            />
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
                </div>
            </section>

            {/* ===== OFFER CALLOUT ===== */}
            {liveOffer && (
                <section className="bg-bg-2 px-5 pb-[clamp(48px,7vw,96px)] sm:px-8">
                    <div
                        data-reveal
                        className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 overflow-hidden rounded-[26px] border border-border bg-surface p-[clamp(24px,4vw,44px)] shadow-[var(--shadow-md)] md:flex-row md:justify-between"
                    >
                        <div className="flex items-center gap-5">
                            <span className="flex size-[72px] shrink-0 flex-col items-center justify-center rounded-full bg-green text-white shadow-[0_12px_26px_-10px_rgba(76,175,80,0.7)]">
                                <span className="text-[22px] leading-none font-extrabold">
                                    {liveOffer.discount}%
                                </span>
                                <span className="text-[10px] font-extrabold tracking-[0.14em]">
                                    OFF
                                </span>
                            </span>
                            <div>
                                <h2 className="font-serif text-[clamp(22px,2.6vw,30px)] leading-tight font-semibold text-foreground">
                                    {liveOffer.title}
                                </h2>
                                <p className="mt-1 max-w-[52ch] text-[14.5px] leading-[1.6] text-soft">
                                    {liveOffer.description}
                                </p>
                            </div>
                        </div>
                        <Link
                            href={liveOffer.cta_url || '/contact'}
                            className="inline-flex shrink-0 items-center gap-2 rounded-[14px] bg-gradient-to-br from-primary to-primary-deep px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_30px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                        >
                            {liveOffer.cta}
                            <MaterialSymbol name="arrow_forward" size={18} />
                        </Link>
                    </div>
                </section>
            )}

            {/* ===== CTA ===== */}
            <section className="bg-background px-5 pb-[clamp(56px,8vw,96px)] sm:px-8">
                <div
                    data-reveal
                    className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[30px] px-[clamp(24px,5vw,72px)] py-[clamp(40px,6vw,72px)] text-center"
                    style={{
                        background:
                            'linear-gradient(135deg,#083b7c 0%,#0b4ea2 50%,#1565c5 100%)',
                    }}
                >
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_22px)]" />
                    <div className="relative mx-auto max-w-[760px]">
                        <h2 className="font-serif text-[clamp(28px,4.4vw,52px)] leading-[1.08] font-semibold text-white">
                            Can&rsquo;t find your perfect trip?
                        </h2>
                        <p className="mx-auto mt-4 max-w-[560px] text-[clamp(15px,1.5vw,18px)] leading-[1.65] text-white/85">
                            Tell us where you want to go and we&rsquo;ll build a
                            bespoke itinerary around your pace, taste and budget.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-7 inline-flex items-center gap-2 rounded-[14px] bg-white px-8 py-4 text-[16px] font-extrabold text-[#083b7c] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5"
                        >
                            Plan my trip
                            <MaterialSymbol name="arrow_forward" size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

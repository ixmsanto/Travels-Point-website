import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import GradientThumb from '@/components/gradient-thumb';
import MaterialSymbol from '@/components/material-symbol';
import { Eyebrow } from '@/components/public/section-heading';
import { cn } from '@/lib/utils';
import type { GalleryItem } from '@/types';

type Props = {
    gallery: GalleryItem[];
};

export default function Gallery({ gallery }: Props) {
    const categories = useMemo(() => {
        const unique = Array.from(new Set(gallery.map((g) => g.category)));
        return ['All', ...unique];
    }, [gallery]);

    const [active, setActive] = useState('All');
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    const visible =
        active === 'All'
            ? gallery
            : gallery.filter((g) => g.category === active);

    return (
        <>
            <Head title="Gallery — Travels Point" />

            {/* ===== HEADER ===== */}
            <section
                className="relative overflow-hidden px-5 pt-[clamp(56px,8vw,104px)] pb-[clamp(40px,6vw,72px)] sm:px-8"
                style={{
                    background:
                        'linear-gradient(150deg,#062a52 0%,#083b7c 55%,#0b4ea2 100%)',
                }}
            >
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_22px)] opacity-50" />
                <div className="tp-float pointer-events-none absolute -top-6 right-[8%] size-[180px] rounded-full bg-[radial-gradient(circle,rgba(245,124,0,0.45),transparent_70%)] blur-[6px]" />
                <MaterialSymbol
                    name="photo_camera"
                    size={28}
                    className="tp-float2 pointer-events-none absolute bottom-10 left-[8%] text-white/25"
                />
                <div
                    data-reveal
                    className="relative mx-auto max-w-[1240px] text-center"
                >
                    <Eyebrow tone="light" className="justify-center">
                        Travel Gallery
                    </Eyebrow>
                    <h1 className="mx-auto mt-4 max-w-[16ch] font-serif text-[clamp(38px,5.6vw,68px)] leading-[1.04] font-semibold tracking-tight text-white">
                        Moments from the{' '}
                        <span className="text-gold italic">journey</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-[600px] text-[clamp(15px,1.5vw,18px)] leading-[1.7] text-white/85">
                        Real frames from the trips we&rsquo;ve designed — the
                        sunsets, streets and stays that make a journey
                        unforgettable.
                    </p>
                </div>
            </section>

            {/* ===== GALLERY GRID ===== */}
            <section className="bg-background px-5 py-[clamp(48px,7vw,96px)] sm:px-8">
                <div className="mx-auto max-w-[1240px]">
                    {gallery.length === 0 ? (
                        <p className="text-center text-[15.5px] text-soft">
                            Our gallery is being curated — check back soon.
                        </p>
                    ) : (
                        <>
                            {categories.length > 1 && (
                                <div
                                    data-reveal
                                    className="flex flex-wrap justify-center gap-2"
                                >
                                    {categories.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setActive(c)}
                                            className={cn(
                                                'rounded-full px-[18px] py-2.5 text-[13.5px] font-bold transition',
                                                active === c
                                                    ? 'bg-primary text-white shadow-[0_10px_22px_-14px_var(--ring-glow)]'
                                                    : 'border border-border bg-surface text-soft hover:border-primary hover:text-primary',
                                            )}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div
                                data-stagger
                                className="mt-10 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4"
                            >
                                {visible.map((g) => (
                                    <button
                                        key={g.id}
                                        type="button"
                                        onClick={() => setLightbox(g)}
                                        aria-label={`View ${g.topic}`}
                                        className="group relative aspect-square overflow-hidden rounded-[18px] text-left shadow-[var(--shadow-sm)]"
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
                                        <span className="pointer-events-none absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                                            <MaterialSymbol
                                                name="zoom_in"
                                                size={18}
                                            />
                                        </span>
                                        <span className="absolute right-3.5 bottom-3.5 left-3.5 text-[14px] leading-[1.25] font-bold text-white">
                                            {g.topic}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="bg-bg-2 px-5 pb-[clamp(56px,8vw,96px)] sm:px-8">
                <div
                    data-reveal
                    className="mx-auto flex max-w-[1240px] flex-col items-center gap-5 rounded-[26px] border border-border bg-surface p-[clamp(28px,4vw,48px)] text-center shadow-[var(--shadow-md)]"
                >
                    <h2 className="font-serif text-[clamp(24px,3.4vw,40px)] leading-tight font-semibold text-foreground">
                        Your photos could be next
                    </h2>
                    <p className="max-w-[520px] text-[15px] leading-[1.65] text-soft">
                        Let&rsquo;s plan a journey worth framing. Tell us your
                        dream destination and we&rsquo;ll handle the rest.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-[14px] bg-gradient-to-br from-primary to-primary-deep px-8 py-4 text-[16px] font-extrabold text-white shadow-[0_18px_40px_-16px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                    >
                        Plan my trip
                        <MaterialSymbol name="arrow_forward" size={18} />
                    </Link>
                </div>
            </section>

            {/* ===== LIGHTBOX ===== */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={lightbox.topic}
                    onClick={() => setLightbox(null)}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setLightbox(null)}
                        className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                    >
                        <MaterialSymbol name="close" size={24} />
                    </button>
                    <figure
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[860px] overflow-hidden rounded-[22px] shadow-[var(--shadow-lg)]"
                    >
                        <GradientThumb
                            tint0={lightbox.tint0}
                            tint1={lightbox.tint1}
                            img={lightbox.img}
                            rounded="rounded-none"
                            className="aspect-[4/3] w-full"
                        />
                        <figcaption className="flex items-center justify-between gap-4 bg-surface px-6 py-4">
                            <p className="text-[16px] font-bold text-foreground">
                                {lightbox.topic}
                            </p>
                            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-[12px] font-bold text-primary-deep">
                                {lightbox.category}
                            </span>
                        </figcaption>
                    </figure>
                </div>
            )}
        </>
    );
}

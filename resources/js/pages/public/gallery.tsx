import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import GradientThumb from '@/components/gradient-thumb';
import MaterialSymbol from '@/components/material-symbol';
import { CtaButton } from '@/components/public/button';
import { Section } from '@/components/public/section';
import { Eyebrow } from '@/components/public/section-heading';
import { Chip } from '@/components/public/ui';
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
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const visible = useMemo(
        () =>
            active === 'All'
                ? gallery
                : gallery.filter((g) => g.category === active),
        [active, gallery],
    );

    const lightbox =
        lightboxIndex !== null ? (visible[lightboxIndex] ?? null) : null;

    const showPrev = () =>
        setLightboxIndex((i) =>
            i === null ? i : (i - 1 + visible.length) % visible.length,
        );
    const showNext = () =>
        setLightboxIndex((i) => (i === null ? i : (i + 1) % visible.length));

    // Keyboard navigation while the lightbox is open.
    useEffect(() => {
        if (lightboxIndex === null) {
            return;
        }

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setLightboxIndex(null);
            } else if (e.key === 'ArrowLeft') {
                setLightboxIndex(
                    (i) =>
                        i === null
                            ? i
                            : (i - 1 + visible.length) % visible.length,
                );
            } else if (e.key === 'ArrowRight') {
                setLightboxIndex((i) =>
                    i === null ? i : (i + 1) % visible.length,
                );
            }
        };

        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxIndex, visible.length]);

    return (
        <>
            <Head title="Gallery — Travels Point" />

            {/* ===== HEADER ===== */}
            <section className="relative overflow-hidden brand-gradient-deep px-5 pt-[clamp(56px,8vw,104px)] pb-[clamp(40px,6vw,72px)] sm:px-8">
                <div className="pointer-events-none absolute inset-0 brand-hatch opacity-50" />
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
            <Section bg="surface" spacing="compact">
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
                            {visible.map((g, i) => (
                                <button
                                    key={g.id}
                                    type="button"
                                    onClick={() => setLightboxIndex(i)}
                                    aria-label={`View ${g.topic}`}
                                    className="group relative aspect-square overflow-hidden rounded-card text-left shadow-[var(--shadow-sm)]"
                                >
                                    <GradientThumb
                                        tint0={g.tint0}
                                        tint1={g.tint1}
                                        img={g.img}
                                        rounded="rounded-none"
                                        className="h-full transition-transform duration-700 group-hover:scale-[1.09]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(6,18,30,0.62)_100%)]" />
                                    <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold text-ink">
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
            </Section>

            {/* ===== CTA ===== */}
            <Section
                bg="muted"
                spacing="none"
                className="pb-[clamp(56px,8vw,96px)]"
            >
                <div
                    data-reveal
                    className="flex flex-col items-center gap-5 rounded-panel border border-border bg-surface p-[clamp(28px,4vw,48px)] text-center shadow-[var(--shadow-md)]"
                >
                    <h2 className="font-serif text-[clamp(24px,3.4vw,40px)] leading-tight font-semibold text-foreground">
                        Your photos could be next
                    </h2>
                    <p className="max-w-[520px] text-[15px] leading-[1.65] text-soft">
                        Let&rsquo;s plan a journey worth framing. Tell us your
                        dream destination and we&rsquo;ll handle the rest.
                    </p>
                    <CtaButton asChild variant="primary" size="lg">
                        <Link href="/contact">
                            Plan my trip
                            <MaterialSymbol name="arrow_forward" size={18} />
                        </Link>
                    </CtaButton>
                </div>
            </Section>

            {/* ===== LIGHTBOX ===== */}
            {lightbox && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={lightbox.topic}
                    onClick={() => setLightboxIndex(null)}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
                >
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                    >
                        <MaterialSymbol name="close" size={24} />
                    </button>

                    {visible.length > 1 && (
                        <>
                            <button
                                type="button"
                                aria-label="Previous"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                className="absolute top-1/2 left-4 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6"
                            >
                                <MaterialSymbol name="chevron_left" size={28} />
                            </button>
                            <button
                                type="button"
                                aria-label="Next"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showNext();
                                }}
                                className="absolute top-1/2 right-4 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6"
                            >
                                <MaterialSymbol name="chevron_right" size={28} />
                            </button>
                        </>
                    )}

                    <figure
                        onClick={(e) => e.stopPropagation()}
                        className="flex max-h-[88vh] w-full max-w-[860px] flex-col overflow-hidden rounded-card shadow-[var(--shadow-lg)]"
                    >
                        <GradientThumb
                            tint0={lightbox.tint0}
                            tint1={lightbox.tint1}
                            img={lightbox.img}
                            fit="contain"
                            rounded="rounded-none"
                            className="h-[min(62vh,560px)] w-full bg-ink"
                        />
                        <figcaption className="flex items-center justify-between gap-4 bg-surface px-6 py-4">
                            <p className="text-[16px] font-bold text-foreground">
                                {lightbox.topic}
                            </p>
                            <div className="flex items-center gap-3">
                                {visible.length > 1 && (
                                    <span className="text-[13px] font-semibold text-soft">
                                        {(lightboxIndex ?? 0) + 1} /{' '}
                                        {visible.length}
                                    </span>
                                )}
                                <Chip tone="primary">{lightbox.category}</Chip>
                            </div>
                        </figcaption>
                    </figure>
                </div>
            )}
        </>
    );
}

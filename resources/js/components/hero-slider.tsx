import { useCallback, useEffect, useRef, useState } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';
import type { Banner } from '@/types';

const AUTO_ADVANCE_MS = 6000;

export type HeroSliderState = {
    index: number;
    count: number;
    select: (i: number) => void;
    next: () => void;
    prev: () => void;
    setPaused: (paused: boolean) => void;
};

/**
 * Slider state (current slide + autoplay), kept separate from rendering so the
 * media and the controls can live in different layers of the page — the media
 * in a fixed parallax backdrop, the controls in the scrolling foreground.
 */
export function useHeroSlider(banners: Banner[]): HeroSliderState {
    const count = banners.length;
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    // Keep the index valid if the banner list shrinks.
    useEffect(() => {
        if (index >= count && count > 0) {
            setIndex(0);
        }
    }, [count, index]);

    // Auto-advance through the slides, pausing on hover.
    useEffect(() => {
        if (count < 2 || paused) {
            return;
        }

        const id = setInterval(
            () => setIndex((i) => (i + 1) % count),
            AUTO_ADVANCE_MS,
        );

        return () => clearInterval(id);
    }, [count, paused]);

    const select = useCallback(
        (i: number) => setIndex(((i % count) + count) % count),
        [count],
    );
    const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
    const prev = useCallback(
        () => setIndex((i) => (i - 1 + count) % count),
        [count],
    );

    return { index, count, select, next, prev, setPaused };
}

/**
 * A single hero slide. Images fill the box edge-to-edge with `object-cover`
 * (like GT) — no letterbox gaps, cropped to the box as needed. Video banners
 * play only while their slide is active — paused and not downloaded otherwise —
 * so a large clip never loads behind a slide the visitor can't see. The banner
 * image (if any) is used as the video poster.
 */
function HeroSlide({
    banner,
    active,
    eager,
}: {
    banner: Banner;
    active: boolean;
    eager: boolean;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) {
            return;
        }

        if (active) {
            video.play().catch(() => {
                /* autoplay may be blocked until interaction — ignore */
            });
        } else {
            video.pause();
        }
    }, [active]);

    return (
        <div
            aria-hidden={!active}
            className="pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: active ? 1 : 0 }}
        >
            {banner.video ? (
                <video
                    ref={videoRef}
                    className="size-full object-cover object-center"
                    src={banner.video}
                    poster={banner.img ?? undefined}
                    muted
                    loop
                    playsInline
                    preload={eager ? 'auto' : 'none'}
                />
            ) : (
                <img
                    className="size-full object-cover object-center"
                    src={banner.img ?? ''}
                    alt=""
                    draggable={false}
                    loading={eager ? 'eager' : 'lazy'}
                />
            )}
        </div>
    );
}

/**
 * The cross-fading media slides — image or video — that fill the hero box.
 * Rendered in the fixed parallax backdrop; the foreground content scrolls over
 * it. Fills the box edge-to-edge at every breakpoint via `object-cover`.
 */
export function HeroBackdrop({
    banners,
    index,
}: {
    banners: Banner[];
    index: number;
}) {
    if (banners.length === 0) {
        return null;
    }

    return (
        <>
            {banners.map((b, i) => (
                <HeroSlide
                    key={b.id}
                    banner={b}
                    active={i === index}
                    eager={i === 0}
                />
            ))}
        </>
    );
}

/**
 * Prev/next arrows and dot indicators for the hero slider. Rendered in the
 * foreground so they sit above the hero text and stay clickable. Hidden when
 * there is only one slide.
 */
export function HeroControls({ state }: { state: HeroSliderState }) {
    const { index, count, select, next, prev } = state;

    if (count < 2) {
        return null;
    }

    return (
        <>
            <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className="absolute top-1/2 left-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition hover:text-white sm:left-6"
            >
                <MaterialSymbol name="chevron_left" size={40} />
            </button>
            <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className="absolute top-1/2 right-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] transition hover:text-white sm:right-6"
            >
                <MaterialSymbol name="chevron_right" size={40} />
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                {Array.from({ length: count }).map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === index}
                        onClick={() => select(i)}
                        className={cn(
                            'h-2 rounded-full transition-all',
                            i === index
                                ? 'w-7 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/80',
                        )}
                    />
                ))}
            </div>
        </>
    );
}

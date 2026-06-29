import { useEffect } from 'react';

/**
 * Scroll-reveal driver for the design system. Elements marked with
 * `data-reveal` (single fade-up) or `data-stagger` (staggered children) start
 * hidden via app.css and get `data-rv="in"` applied when they enter the
 * viewport, triggering the `tpRevealIn` animation.
 *
 * Pass a value that changes on navigation (e.g. the Inertia page url) so the
 * DOM is re-scanned after each page transition.
 */
export function useReveal(dep?: unknown) {
    useEffect(() => {
        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        const noIO = typeof IntersectionObserver === 'undefined';

        const reveal = (el: HTMLElement) => {
            el.dataset.rv = 'in';
        };

        const collect = () =>
            Array.from(
                document.querySelectorAll<HTMLElement>(
                    '[data-reveal],[data-stagger]',
                ),
            ).filter((el) => el.dataset.rv !== 'in');

        let io: IntersectionObserver | null = null;
        let fallback = 0;

        // Defer one frame so a freshly-navigated page's DOM is laid out before
        // we measure and observe it. Scanning in the effect body can race the
        // commit/layout and drop the observer's initial callback, leaving the
        // page stuck at opacity:0 (the "blank page after clicking" bug).
        const raf = requestAnimationFrame(() => {
            const els = collect();

            if (els.length === 0) {
                return;
            }

            if (noIO || reduceMotion) {
                els.forEach(reveal);

                return;
            }

            io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            reveal(entry.target as HTMLElement);
                            io?.unobserve(entry.target);
                        }
                    });
                },
                { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
            );

            els.forEach((el) => {
                // Already scrolled past (entirely above the viewport): the
                // observer fires only on *entering* view, so it would never
                // reveal this element. Show it now instead of leaving it blank.
                if (el.getBoundingClientRect().bottom <= 0) {
                    reveal(el);

                    return;
                }

                io!.observe(el);
            });

            // Safety net for a dropped initial callback: shortly after the scan,
            // force-reveal anything still hidden that's within the viewport so
            // on-screen content can never remain invisible.
            fallback = window.setTimeout(() => {
                collect().forEach((el) => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        reveal(el);
                    }
                });
            }, 300);
        });

        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(fallback);
            io?.disconnect();
        };
    }, [dep]);
}

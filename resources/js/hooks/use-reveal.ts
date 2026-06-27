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
        const els = Array.from(
            document.querySelectorAll<HTMLElement>(
                '[data-reveal],[data-stagger]',
            ),
        ).filter((el) => el.dataset.rv !== 'in');

        if (els.length === 0) {
            return;
        }

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (typeof IntersectionObserver === 'undefined' || reduceMotion) {
            els.forEach((el) => {
                el.dataset.rv = 'in';
            });

            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).dataset.rv = 'in';
                        io.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
        );

        els.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, [dep]);
}

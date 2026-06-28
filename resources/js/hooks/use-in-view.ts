import { useEffect, useRef, useState } from 'react';

/**
 * Tracks whether the referenced element is intersecting the viewport.
 *
 * Used to switch off expensive, purely-decorative work (parallax backdrops,
 * looping animations) once it scrolls out of view. Starts `true` so server-
 * rendered / first-paint content is visible before the observer attaches.
 */
export function useInView<T extends Element = HTMLElement>(
    rootMargin = '0px',
    threshold: number | number[] = 0,
) {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(true);

    useEffect(() => {
        const el = ref.current;

        if (!el || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { rootMargin, threshold },
        );

        io.observe(el);

        return () => io.disconnect();
    }, [rootMargin, threshold]);

    return [ref, inView] as const;
}

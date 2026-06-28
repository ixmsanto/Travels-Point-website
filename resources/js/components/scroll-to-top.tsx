import { useEffect, useState } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';

/**
 * Floating "back to top" button. Fades in once the page is scrolled past a
 * threshold and smoothly scrolls to the top when clicked. Sits above the
 * WhatsApp button so the two don't overlap.
 */
export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            type="button"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
                'fixed right-5 bottom-[calc(152px+env(safe-area-inset-bottom))] z-40 inline-flex size-12 items-center justify-center rounded-full border border-border-strong bg-background/85 text-foreground shadow-[0_12px_28px_-12px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[opacity,transform,color,border-color] duration-300 ease-snappy hover:-translate-y-0.5 hover:border-primary hover:text-primary md:bottom-[84px]',
                visible
                    ? 'pointer-events-auto translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0',
            )}
        >
            <MaterialSymbol name="arrow_upward" size={24} />
        </button>
    );
}

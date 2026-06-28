import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
    tint0: string;
    tint1: string;
    img?: string | null;
    className?: string;
    children?: ReactNode;
    rounded?: string;
    /** How the image fills the box. `contain` shows the whole image uncropped. */
    fit?: 'cover' | 'contain';
};

/**
 * Diagonal gradient placeholder used across the marketing site and console.
 * Falls back to the brand-tinted gradient when no image is provided — mirrors
 * the original Travels Point design where cards are tinted by destination.
 */
export default function GradientThumb({
    tint0,
    tint1,
    img,
    className,
    children,
    rounded = 'rounded-xl',
    fit = 'cover',
}: Props) {
    return (
        <div
            className={cn('relative overflow-hidden', rounded, className)}
            style={
                img
                    ? {
                          backgroundImage: `url(${img})`,
                          backgroundSize: fit,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                      }
                    : {
                          backgroundImage: `linear-gradient(135deg, ${tint0} 0%, ${tint1} 100%)`,
                      }
            }
        >
            {/* Subtle texture sheen */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
            {children}
        </div>
    );
}

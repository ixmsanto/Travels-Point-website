import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * The one CTA button for the public marketing site. Replaces the dozen
 * near-identical gradient buttons that previously each picked their own radius,
 * padding, shadow and text size.
 *
 * Render a real <button> by default, or use `asChild` to project the styles
 * onto an Inertia <Link> / <a>:
 *
 *   <CtaButton asChild size="lg">
 *       <Link href="/contact">Plan my trip <MaterialSymbol name="arrow_forward" /></Link>
 *   </CtaButton>
 */
export const ctaVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-button font-bold transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-70',
    {
        variants: {
            variant: {
                /** Default brand CTA — gradient fill on light surfaces. */
                primary:
                    'bg-gradient-to-br from-primary to-primary-deep text-white shadow-[0_16px_34px_-16px_var(--ring-glow)] hover:brightness-110',
                /** Solid white CTA — for use on brand-gradient bands. */
                white: 'bg-white text-ink-brand shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)]',
                /** Glassy outline CTA — for use on brand-gradient bands. */
                ghost: 'border border-white/40 bg-white/15 text-white backdrop-blur-md hover:border-white/75 hover:bg-white/25',
                /** Gold accent CTA — offers / promotions. */
                gold: 'bg-gradient-to-br from-gold to-[#d96b00] text-white shadow-[0_10px_22px_-12px_rgba(245,124,0,0.7)]',
                /** Quiet bordered button on light surfaces. */
                outline:
                    'border border-border-strong bg-surface text-foreground hover:border-primary hover:text-primary hover:shadow-[var(--shadow-md)]',
            },
            size: {
                sm: 'px-[18px] py-3 text-[14px]',
                md: 'px-7 py-3.5 text-[15px]',
                lg: 'px-8 py-4 text-[16px]',
            },
            block: {
                true: 'w-full',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
            block: false,
        },
    },
);

export type CtaButtonProps = ComponentProps<'button'> &
    VariantProps<typeof ctaVariants> & {
        asChild?: boolean;
    };

export function CtaButton({
    className,
    variant,
    size,
    block,
    asChild = false,
    ...props
}: CtaButtonProps) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            className={cn(ctaVariants({ variant, size, block }), className)}
            {...props}
        />
    );
}

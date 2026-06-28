import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';

/**
 * Small, repeated public-site primitives, standardized so every card, chip and
 * filter control shares one set of radii, paddings and weights.
 */

/* ── Card ─────────────────────────────────────────────────────────
   The standard surface card. `interactive` adds the hover-lift used on
   clickable cards (destinations, packages, offers, team). */
export function Card({
    interactive = false,
    className,
    children,
}: {
    interactive?: boolean;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                'overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-sm)]',
                interactive &&
                    'transition hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]',
                className,
            )}
        >
            {children}
        </div>
    );
}

/* ── Chip ─────────────────────────────────────────────────────────
   A small pill, typically laid over imagery. `tone="light"` is the
   white-on-image badge; `tone="dark"` is the translucent dark badge. */
const chipVariants = cva(
    'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold backdrop-blur',
    {
        variants: {
            tone: {
                light: 'bg-white/90 text-ink',
                dark: 'bg-ink/55 text-white',
                green: 'bg-green-soft text-green-deep',
                primary: 'bg-primary-soft text-primary-deep',
            },
        },
        defaultVariants: { tone: 'light' },
    },
);

export function Chip({
    icon,
    iconFill = false,
    tone,
    className,
    children,
}: {
    icon?: string;
    iconFill?: boolean;
    className?: string;
    children: ReactNode;
} & VariantProps<typeof chipVariants>) {
    return (
        <span className={cn(chipVariants({ tone }), className)}>
            {icon && <MaterialSymbol name={icon} size={14} fill={iconFill} />}
            {children}
        </span>
    );
}

/* ── IconTile ─────────────────────────────────────────────────────
   The rounded gradient square that fronts feature/value/stat cards. */
const iconTileVariants = cva('flex items-center justify-center rounded-card', {
    variants: {
        tone: {
            brand: 'bg-gradient-to-br from-primary-soft to-gold-soft text-primary-deep',
            primary: 'bg-primary-soft text-primary-deep',
            gold: 'bg-gold-soft text-gold',
            muted: 'bg-surface-2 text-primary-deep',
        },
        size: {
            sm: 'size-10',
            md: 'size-12',
            lg: 'size-[54px]',
        },
    },
    defaultVariants: { tone: 'brand', size: 'lg' },
});

export function IconTile({
    icon,
    iconSize = 26,
    tone,
    size,
    className,
}: {
    icon: string;
    iconSize?: number;
    className?: string;
} & VariantProps<typeof iconTileVariants>) {
    return (
        <span className={cn(iconTileVariants({ tone, size }), className)}>
            <MaterialSymbol name={icon} size={iconSize} />
        </span>
    );
}

/* ── FilterTabs ───────────────────────────────────────────────────
   The boxed segmented control used to filter packages / offers. */
export function FilterTabs<T extends string>({
    tabs,
    value,
    onChange,
    renderIcon,
    className,
}: {
    tabs: readonly T[];
    value: T;
    onChange: (tab: T) => void;
    renderIcon?: (tab: T) => ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                // `max-w-full` + horizontal scroll keeps every tab reachable on
                // narrow screens instead of overflowing the viewport. The
                // scrollbar itself is hidden — users swipe the row.
                'flex max-w-full gap-1.5 overflow-x-auto rounded-button border border-border bg-surface-2 p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                className,
            )}
        >
            {tabs.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    onClick={() => onChange(tab)}
                    className={cn(
                        'inline-flex shrink-0 items-center gap-1.5 rounded-control px-4 py-2.5 text-[14px] font-bold whitespace-nowrap capitalize transition sm:px-5',
                        value === tab
                            ? 'bg-primary text-white shadow-[0_10px_22px_-14px_var(--ring-glow)]'
                            : 'text-soft hover:text-primary',
                    )}
                >
                    {renderIcon?.(tab)}
                    {tab}
                </button>
            ))}
        </div>
    );
}

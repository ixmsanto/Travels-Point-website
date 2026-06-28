import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Public-site layout primitives — the single standard for page width and the
 * vertical rhythm between sections. Use <Section> for every marketing band and
 * <Container> for the centered content column inside custom sections.
 */

const widthClass = {
    /** Standard marketing content column. */
    default: 'max-w-[1240px]',
    /** Reading-width column (long-form copy, timelines). */
    narrow: 'max-w-[880px]',
    /** Centered prose / hero intros. */
    prose: 'max-w-[760px]',
} as const;

export type ContainerWidth = keyof typeof widthClass;

export function Container({
    width = 'default',
    className,
    children,
}: {
    width?: ContainerWidth;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={cn(
                'mx-auto w-full px-5 sm:px-8',
                widthClass[width],
                className,
            )}
        >
            {children}
        </div>
    );
}

const bgClass = {
    /** Default page surface. */
    surface: 'bg-background',
    /** Alternating tinted surface for rhythm between sections. */
    muted: 'bg-bg-2',
    /** Brand gradient band with the diagonal sheen; text defaults to white. */
    brand: 'brand-gradient text-white',
    /** Deeper brand gradient band (testimonials, gallery header). */
    'brand-deep': 'brand-gradient-deep text-white',
} as const;

const spacingClass = {
    /** Standard section padding. */
    normal: 'py-[clamp(64px,9vw,112px)]',
    /** Tighter section padding (grids that follow a header band). */
    compact: 'py-[clamp(48px,7vw,88px)]',
    /** No vertical padding — caller controls it via className. */
    none: '',
} as const;

export type SectionBg = keyof typeof bgClass;
export type SectionSpacing = keyof typeof spacingClass;

export function Section({
    bg = 'surface',
    spacing = 'normal',
    width = 'default',
    id,
    hatch = false,
    className,
    containerClassName,
    children,
}: {
    bg?: SectionBg;
    spacing?: SectionSpacing;
    width?: ContainerWidth;
    id?: string;
    /** Overlay the brand diagonal hatch (only meaningful on brand backgrounds). */
    hatch?: boolean;
    className?: string;
    containerClassName?: string;
    children: ReactNode;
}) {
    const isBrand = bg === 'brand' || bg === 'brand-deep';

    return (
        <section
            id={id}
            className={cn(
                'relative px-5 sm:px-8',
                id ? 'scroll-mt-20' : '',
                bgClass[bg],
                spacingClass[spacing],
                isBrand ? 'overflow-hidden' : '',
                className,
            )}
        >
            {hatch && (
                <div className="pointer-events-none absolute inset-0 brand-hatch opacity-50" />
            )}
            <Container
                width={width}
                className={cn('relative px-0', containerClassName)}
            >
                {children}
            </Container>
        </section>
    );
}

/**
 * A bare centered wrapper for cases that are not a full page section (e.g. the
 * header/footer rows in the layout) but still want the standard page width.
 */
export function Band({
    as: As = 'div',
    width = 'default',
    className,
    children,
}: {
    as?: ElementType;
    width?: ContainerWidth;
    className?: string;
    children: ReactNode;
}) {
    return (
        <As className={className}>
            <Container width={width}>{children}</Container>
        </As>
    );
}

import type { ReactNode } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';

export function Eyebrow({
    children,
    icon,
    className,
    tone = 'primary',
}: {
    children: ReactNode;
    icon?: string;
    className?: string;
    tone?: 'primary' | 'gold' | 'green' | 'light';
}) {
    const toneClass = {
        primary: 'text-primary-deep',
        gold: 'text-gold',
        green: 'text-green-deep',
        light: 'text-white/80',
    }[tone];

    return (
        <span
            className={cn(
                'inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.16em] uppercase',
                toneClass,
                className,
            )}
        >
            {icon ? (
                <MaterialSymbol name={icon} size={16} />
            ) : (
                <span
                    className={cn(
                        'h-px w-[26px]',
                        tone === 'light' ? 'bg-white/70' : 'bg-current',
                    )}
                />
            )}
            {children}
        </span>
    );
}

export function SectionHeading({
    eyebrow,
    eyebrowIcon,
    eyebrowTone,
    title,
    subtitle,
    align = 'center',
    invert = false,
    reveal = false,
    className,
}: {
    eyebrow: string;
    eyebrowIcon?: string;
    eyebrowTone?: 'primary' | 'gold' | 'green' | 'light';
    title: ReactNode;
    subtitle?: string;
    align?: 'center' | 'left';
    invert?: boolean;
    reveal?: boolean;
    className?: string;
}) {
    return (
        <div
            {...(reveal ? { 'data-reveal': '' } : {})}
            className={cn(
                align === 'center'
                    ? 'mx-auto max-w-[680px] text-center'
                    : 'max-w-[640px]',
                className,
            )}
        >
            <Eyebrow
                icon={eyebrowIcon}
                tone={eyebrowTone ?? (invert ? 'light' : 'primary')}
                className={align === 'center' ? 'justify-center' : ''}
            >
                {eyebrow}
            </Eyebrow>
            <h2
                className={cn(
                    'mt-4 font-serif text-[clamp(32px,4.6vw,54px)] leading-[1.05] font-semibold tracking-tight',
                    invert ? 'text-white' : 'text-foreground',
                )}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={cn(
                        'mt-4 text-[clamp(15px,1.4vw,18px)] leading-[1.7]',
                        invert ? 'text-white/80' : 'text-soft',
                    )}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}

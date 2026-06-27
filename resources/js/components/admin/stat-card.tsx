import { Link } from '@inertiajs/react';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';

export type StatTone = 'blue' | 'orange' | 'green' | 'deep';

const tones: Record<StatTone, string> = {
    blue: 'bg-primary/15 text-primary',
    orange: 'bg-gold/15 text-gold',
    green: 'bg-green-soft text-green-deep',
    deep: 'bg-primary-soft text-primary-deep',
};

export default function StatCard({
    label,
    value,
    icon,
    tone = 'blue',
    href,
}: {
    label: string;
    value: number | string;
    icon: string;
    tone?: StatTone;
    href?: string;
}) {
    const inner = (
        <div className="flex items-center gap-3.5 rounded-[16px] border border-border bg-surface p-[18px] shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-md)]">
            <span
                className={cn(
                    'flex size-[46px] shrink-0 items-center justify-center rounded-[13px]',
                    tones[tone],
                )}
            >
                <MaterialSymbol name={icon} size={24} />
            </span>
            <div>
                <p className="text-[26px] leading-none font-extrabold tracking-[-0.02em] text-foreground">
                    {value}
                </p>
                <p className="mt-1 text-[12.5px] font-semibold text-faint">
                    {label}
                </p>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {inner}
            </Link>
        );
    }

    return inner;
}

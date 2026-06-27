import { cn } from '@/lib/utils';

type Props = {
    /** Hide the wordmark and render only the logo mark. */
    markOnly?: boolean;
    /** Tailwind height for the logo mark, e.g. "h-10". */
    markClassName?: string;
    /** Extra classes for the wordmark text. */
    wordClassName?: string;
    className?: string;
};

export default function TravelLogo({
    markOnly = false,
    markClassName,
    wordClassName,
    className,
}: Props) {
    return (
        <span className={cn('flex items-center gap-2.5', className)}>
            <img
                src="/logo.png"
                alt="Travels Point"
                className={cn('object-contain', markClassName ?? 'h-10 w-auto')}
            />
            {!markOnly && (
                <span
                    className={cn(
                        'font-serif text-[25px] leading-none font-semibold tracking-[0.005em] text-foreground',
                        wordClassName,
                    )}
                >
                    Travels Point
                </span>
            )}
        </span>
    );
}

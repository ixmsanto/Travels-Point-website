import MaterialSymbol from '@/components/material-symbol';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

export default function ThemeToggle({ className }: { className?: string }) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    return (
        <button
            type="button"
            aria-label="Toggle dark mode"
            onClick={() => updateAppearance(isDark ? 'light' : 'dark')}
            className={cn(
                'inline-flex size-10 items-center justify-center rounded-xl border border-border-strong bg-surface-2 text-soft transition hover:-translate-y-px hover:border-primary hover:text-primary',
                className,
            )}
        >
            <MaterialSymbol name={isDark ? 'light_mode' : 'dark_mode'} size={21} />
        </button>
    );
}

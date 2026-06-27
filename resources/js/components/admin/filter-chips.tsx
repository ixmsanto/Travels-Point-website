import { cn } from '@/lib/utils';

export default function FilterChips({
    options,
    active,
    onSelect,
}: {
    options: string[];
    active: string;
    onSelect: (value: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    onClick={() => onSelect(option)}
                    className={cn(
                        'rounded-full border px-[15px] py-2.5 text-[13px] font-bold transition hover:-translate-y-px',
                        active === option
                            ? 'border-primary bg-primary-soft text-primary-deep'
                            : 'border-border-strong bg-surface text-soft hover:border-primary hover:text-primary',
                    )}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

import type { ReactNode } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';

export default function Field({
    label,
    htmlFor,
    error,
    hint,
    className,
    children,
}: {
    label: string;
    htmlFor?: string;
    error?: string;
    hint?: string;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div className={cn('grid gap-2', className)}>
            <label
                htmlFor={htmlFor}
                className="text-[13px] font-bold text-soft"
            >
                {label}
            </label>
            {children}
            {hint && !error && (
                <p className="text-[12.5px] text-faint">{hint}</p>
            )}
            {error && (
                <p className="flex items-center gap-1 text-[12.5px] font-semibold text-destructive">
                    <MaterialSymbol name="error" size={14} />
                    {error}
                </p>
            )}
        </div>
    );
}

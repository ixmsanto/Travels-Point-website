import * as React from 'react';

import { cn } from '@/lib/utils';

type SwitchProps = {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    id?: string;
    name?: string;
    disabled?: boolean;
    className?: string;
};

/**
 * Lightweight, dependency-free toggle that mirrors the shadcn Switch API.
 */
function Switch({ checked, onCheckedChange, id, name, disabled, className }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            id={id}
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            data-slot="switch"
            className={cn(
                'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
                checked ? 'bg-primary' : 'bg-input',
                className,
            )}
        >
            {name && <input type="hidden" name={name} value={checked ? '1' : '0'} />}
            <span
                className={cn(
                    'pointer-events-none block size-5 rounded-full bg-white shadow-sm ring-0 transition-transform',
                    checked ? 'translate-x-[22px]' : 'translate-x-0.5',
                )}
            />
        </button>
    );
}

export { Switch };

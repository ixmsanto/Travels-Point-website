import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import MaterialSymbol from '@/components/material-symbol';

type Props = {
    /** Base path to issue the GET request to, e.g. "/admin/offers". */
    routePath: string;
    initial?: string;
    placeholder?: string;
    /** Extra query params to preserve alongside the search term. */
    extraParams?: Record<string, string>;
};

export default function AdminSearch({
    routePath,
    initial = '',
    placeholder = 'Search…',
    extraParams = {},
}: Props) {
    const [value, setValue] = useState(initial);
    const first = useRef(true);

    useEffect(() => {
        if (first.current) {
            first.current = false;

            return;
        }

        const id = setTimeout(() => {
            router.get(
                routePath,
                { ...extraParams, ...(value ? { search: value } : {}) },
                { preserveState: true, preserveScroll: true, replace: true },
            );
        }, 300);

        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className="flex w-full max-w-xs items-center gap-2.5 rounded-[12px] border border-border-strong bg-surface px-[15px] py-[11px]">
            <MaterialSymbol
                name="search"
                size={20}
                className="text-faint"
            />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-transparent text-[14.5px] text-foreground outline-none placeholder:text-faint"
            />
        </div>
    );
}

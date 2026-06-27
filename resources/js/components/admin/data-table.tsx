import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import DeleteButton from '@/components/admin/delete-button';
import GradientThumb from '@/components/gradient-thumb';
import MaterialSymbol from '@/components/material-symbol';
import { cn } from '@/lib/utils';

export type Column = {
    label: string;
    align?: 'left' | 'right';
    className?: string;
};

export function DataTable({
    columns,
    children,
    empty,
    emptyLabel = 'No records found',
}: {
    columns: Column[];
    children: ReactNode;
    empty?: boolean;
    emptyLabel?: string;
}) {
    return (
        <div className="overflow-hidden rounded-[18px] border border-border bg-surface shadow-[var(--shadow-sm)]">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-border bg-surface-2">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={cn(
                                        'px-5 py-3.5 text-[11.5px] font-bold tracking-[0.06em] text-faint uppercase',
                                        col.align === 'right'
                                            ? 'text-right'
                                            : 'text-left',
                                        col.className,
                                    )}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {empty ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-5 py-14 text-center"
                                >
                                    <MaterialSymbol
                                        name="inbox"
                                        size={40}
                                        className="text-faint opacity-50"
                                    />
                                    <p className="mt-2 text-[15px] font-semibold text-faint">
                                        {emptyLabel}
                                    </p>
                                    <p className="text-[13.5px] text-faint">
                                        Try a different search or filter.
                                    </p>
                                </td>
                            </tr>
                        ) : (
                            children
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export function Tr({ children }: { children: ReactNode }) {
    return (
        <tr className="border-b border-border transition last:border-0 hover:bg-surface-2">
            {children}
        </tr>
    );
}

export function Td({
    children,
    align = 'left',
    className,
}: {
    children: ReactNode;
    align?: 'left' | 'right';
    className?: string;
}) {
    return (
        <td
            className={cn(
                'px-5 py-3.5 text-[14px]',
                align === 'right' ? 'text-right' : 'text-left',
                className,
            )}
        >
            {children}
        </td>
    );
}

/** Title cell with a gradient/image thumbnail and primary label. */
export function ThumbCell({
    tint0,
    tint1,
    img,
    title,
    subtitle,
}: {
    tint0: string;
    tint1: string;
    img?: string | null;
    title: string;
    subtitle?: string;
}) {
    return (
        <div className="flex items-center gap-3">
            <GradientThumb
                tint0={tint0}
                tint1={tint1}
                img={img}
                rounded="rounded-[10px]"
                className="size-[42px] shrink-0"
            />
            <div className="min-w-0">
                <p className="truncate font-bold text-foreground">{title}</p>
                {subtitle && (
                    <p className="max-w-[260px] truncate text-[12.5px] text-faint">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

export function BoolCell({ value }: { value: boolean }) {
    return value ? (
        <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-green-deep">
            <MaterialSymbol name="check_circle" size={18} fill />
            Yes
        </span>
    ) : (
        <span className="inline-flex items-center gap-1 text-[12.5px] font-bold text-faint">
            <MaterialSymbol name="cancel" size={18} />
            No
        </span>
    );
}

export function RatingCell({ value }: { value: number }) {
    return (
        <span className="inline-flex items-center gap-1 font-bold text-foreground">
            <MaterialSymbol name="star" size={15} fill className="text-gold" />
            {value.toFixed(1)}
        </span>
    );
}

/** Edit + delete action buttons aligned to the right. */
export function RowActions({
    editHref,
    viewHref,
    deleteAction,
    deleteLabel,
}: {
    editHref?: string;
    viewHref?: string;
    deleteAction: string;
    deleteLabel: string;
}) {
    return (
        <div className="flex items-center justify-end gap-1.5">
            {viewHref && (
                <Link
                    href={viewHref}
                    aria-label="View"
                    className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-primary-deep transition hover:-translate-y-px hover:border-primary hover:bg-primary-soft"
                >
                    <MaterialSymbol name="visibility" size={18} />
                </Link>
            )}
            {editHref && (
                <Link
                    href={editHref}
                    aria-label="Edit"
                    className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-primary-deep transition hover:-translate-y-px hover:border-primary hover:bg-primary-soft"
                >
                    <MaterialSymbol name="edit" size={18} />
                </Link>
            )}
            <DeleteButton
                action={deleteAction}
                label={deleteLabel}
                trigger={
                    <button
                        type="button"
                        aria-label={`Delete ${deleteLabel}`}
                        className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-destructive transition hover:-translate-y-px hover:border-destructive hover:bg-destructive/10"
                    >
                        <MaterialSymbol name="delete" size={18} />
                    </button>
                }
            />
        </div>
    );
}

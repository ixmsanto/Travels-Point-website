import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminSearch from '@/components/admin/admin-search';
import { DataTable, RowActions, Td, Tr } from '@/components/admin/data-table';
import FilterChips from '@/components/admin/filter-chips';
import PageHeader from '@/components/admin/page-header';
import StatusBadge from '@/components/admin/status-badge';
import MaterialSymbol from '@/components/material-symbol';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { Inquiry, InquiryStatus } from '@/types';

type Props = {
    inquiries: Inquiry[];
    filters: { search: string; status: string };
};

const STATUSES: InquiryStatus[] = ['New', 'Replied', 'Closed'];

function formatDate(value: string | null) {
    if (!value) {
        return '—';
    }

    return new Date(value).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function initialsOf(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}

function InquiryDetail({ inquiry }: { inquiry: Inquiry }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    aria-label="View inquiry"
                    className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-primary-deep transition hover:-translate-y-px hover:border-primary hover:bg-primary-soft"
                >
                    <MaterialSymbol name="visibility" size={18} />
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{inquiry.name}</DialogTitle>
                    <DialogDescription>
                        {inquiry.destination ?? 'General enquiry'} · received{' '}
                        {formatDate(inquiry.created_at)}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 text-[14px]">
                    <div className="flex items-center gap-2 text-soft">
                        <MaterialSymbol
                            name="mail"
                            size={16}
                            className="text-primary"
                        />
                        <a
                            href={`mailto:${inquiry.email}`}
                            className="hover:text-primary"
                        >
                            {inquiry.email}
                        </a>
                    </div>
                    {inquiry.phone && (
                        <div className="flex items-center gap-2 text-soft">
                            <MaterialSymbol
                                name="call"
                                size={16}
                                className="text-primary"
                            />
                            <a
                                href={`tel:${inquiry.phone}`}
                                className="hover:text-primary"
                            >
                                {inquiry.phone}
                            </a>
                        </div>
                    )}
                    <div className="flex items-center gap-2 text-soft">
                        <MaterialSymbol
                            name="place"
                            size={16}
                            className="text-primary"
                        />
                        {inquiry.destination ?? '—'} · travel date{' '}
                        {formatDate(inquiry.travel_date)}
                    </div>
                    <div className="mt-2 rounded-[12px] bg-surface-2 p-4 leading-relaxed text-foreground">
                        {inquiry.message}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function InquiriesIndex({ inquiries, filters }: Props) {
    const [pendingId, setPendingId] = useState<number | null>(null);

    const changeStatus = (inquiry: Inquiry, status: string) => {
        setPendingId(inquiry.id);
        router.patch(
            `/admin/inquiries/${inquiry.id}`,
            { status },
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setPendingId(null),
            },
        );
    };

    const filterStatus = (s: string) => {
        router.get(
            '/admin/inquiries',
            {
                ...(filters.search ? { search: filters.search } : {}),
                ...(s !== 'All' ? { status: s } : {}),
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <Head title="Contact Inquiries" />

            <PageHeader
                title="Contact Inquiries"
                description={`Showing ${inquiries.length} of ${inquiries.length}`}
            />

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/inquiries"
                    initial={filters.search}
                    placeholder="Search inquiries…"
                    extraParams={
                        filters.status !== 'All'
                            ? { status: filters.status }
                            : {}
                    }
                />
                <FilterChips
                    options={['All', ...STATUSES]}
                    active={filters.status || 'All'}
                    onSelect={filterStatus}
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Guest' },
                    { label: 'Destination' },
                    { label: 'Date' },
                    { label: 'Status' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={inquiries.length === 0}
                emptyLabel="No inquiries found"
            >
                {inquiries.map((i) => (
                    <Tr key={i.id}>
                        <Td>
                            <div className="flex items-center gap-3">
                                <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary to-primary-deep text-[13px] font-extrabold text-white">
                                    {initialsOf(i.name)}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate font-bold text-foreground">
                                        {i.name}
                                    </p>
                                    <p className="max-w-[220px] truncate text-[12.5px] text-faint">
                                        {i.email}
                                    </p>
                                </div>
                            </div>
                        </Td>
                        <Td className="text-soft">{i.destination ?? '—'}</Td>
                        <Td className="text-soft">
                            {formatDate(i.travel_date)}
                        </Td>
                        <Td>
                            <Select
                                value={i.status}
                                onValueChange={(v) => changeStatus(i, v)}
                                disabled={pendingId === i.id}
                            >
                                <SelectTrigger className="h-auto w-auto gap-1.5 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0">
                                    <SelectValue>
                                        <StatusBadge status={i.status} />
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUSES.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Td>
                        <Td align="right">
                            <div className="flex items-center justify-end gap-1.5">
                                <InquiryDetail inquiry={i} />
                                <RowActions
                                    deleteAction={`/admin/inquiries/${i.id}`}
                                    deleteLabel={i.name}
                                />
                            </div>
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

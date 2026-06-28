import { Head, Link, router } from '@inertiajs/react';
import AdminSearch from '@/components/admin/admin-search';
import {
    BoolCell,
    DataTable,
    RowActions,
    Td,
    ThumbCell,
    Tr,
} from '@/components/admin/data-table';
import FilterChips from '@/components/admin/filter-chips';
import PageHeader from '@/components/admin/page-header';
import StatusBadge from '@/components/admin/status-badge';
import MaterialSymbol from '@/components/material-symbol';
import type { Offer } from '@/types';

type Props = {
    offers: Offer[];
    filters: { search: string; status: string };
};

const STATUSES = ['All', 'Active', 'Scheduled', 'Expired'];

export default function OffersIndex({ offers, filters }: Props) {
    const activeStatus = filters.status || 'All';

    const setStatus = (s: string) => {
        router.get(
            '/admin/offers',
            {
                ...(filters.search ? { search: filters.search } : {}),
                ...(s !== 'All' ? { status: s } : {}),
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <Head title="Offers" />

            <PageHeader
                title="Offers"
                description={`Showing ${offers.length} of ${offers.length}`}
            >
                <Link
                    href="/admin/offers/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Offer
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/offers"
                    initial={filters.search}
                    placeholder="Search offers…"
                />
                <FilterChips
                    options={STATUSES}
                    active={activeStatus}
                    onSelect={setStatus}
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Offer' },
                    { label: 'Discount' },
                    { label: 'Valid till' },
                    { label: 'Featured' },
                    { label: 'Status' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={offers.length === 0}
                emptyLabel="No offers found"
            >
                {offers.map((o) => (
                    <Tr key={o.id}>
                        <Td>
                            <ThumbCell
                                tint0={o.tint0}
                                tint1={o.tint1}
                                img={o.img}
                                title={o.title}
                                subtitle={o.description}
                            />
                        </Td>
                        <Td>
                            <span className="inline-flex rounded-full bg-gold-soft px-[11px] py-1 text-[11.5px] font-bold text-gold">
                                {o.discount}% OFF
                            </span>
                        </Td>
                        <Td className="text-soft">
                            {new Date(o.expiry).toLocaleDateString('en-GB', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </Td>
                        <Td>
                            <BoolCell value={o.featured} />
                        </Td>
                        <Td>
                            <StatusBadge status={o.status} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/offers/${o.id}/edit`}
                                deleteAction={`/admin/offers/${o.id}`}
                                deleteLabel={o.title}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

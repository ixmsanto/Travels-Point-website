import { Head, Link } from '@inertiajs/react';
import AdminSearch from '@/components/admin/admin-search';
import {
    BoolCell,
    DataTable,
    RowActions,
    Td,
    ThumbCell,
    Tr,
} from '@/components/admin/data-table';
import PageHeader from '@/components/admin/page-header';
import StatusBadge from '@/components/admin/status-badge';
import MaterialSymbol from '@/components/material-symbol';
import type { Banner } from '@/types';

type Props = {
    banners: Banner[];
    filters: { search: string };
};

export default function BannersIndex({ banners, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Homepage Banners" />

            <PageHeader
                title="Homepage Banners"
                description={`Showing ${banners.length} of ${banners.length}`}
            >
                <Link
                    href="/admin/banners/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Banner
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/banners"
                    initial={filters.search}
                    placeholder="Search banners…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Banner' },
                    { label: 'Placement' },
                    { label: 'Active' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={banners.length === 0}
                emptyLabel="No banners found"
            >
                {banners.map((b) => (
                    <Tr key={b.id}>
                        <Td>
                            <ThumbCell
                                tint0={b.tint0}
                                tint1={b.tint1}
                                img={b.img}
                                title={b.title}
                                subtitle={b.subtitle}
                            />
                        </Td>
                        <Td>
                            <StatusBadge status={b.placement} />
                        </Td>
                        <Td>
                            <BoolCell value={b.active} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/banners/${b.id}/edit`}
                                deleteAction={`/admin/banners/${b.id}`}
                                deleteLabel={b.title}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

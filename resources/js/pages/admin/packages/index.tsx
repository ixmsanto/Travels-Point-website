import { Head, Link } from '@inertiajs/react';
import AdminSearch from '@/components/admin/admin-search';
import {
    DataTable,
    RatingCell,
    RowActions,
    Td,
    ThumbCell,
    Tr,
} from '@/components/admin/data-table';
import PageHeader from '@/components/admin/page-header';
import MaterialSymbol from '@/components/material-symbol';
import { formatINR } from '@/lib/currency';
import type { TourPackage } from '@/types';

type Props = {
    packages: TourPackage[];
    filters: { search: string };
};

export default function PackagesIndex({ packages, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Tour Packages" />

            <PageHeader
                title="Tour Packages"
                description={`Showing ${packages.length} of ${packages.length}`}
            >
                <Link
                    href="/admin/packages/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Package
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/packages"
                    initial={filters.search}
                    placeholder="Search packages…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Package' },
                    { label: 'Location' },
                    { label: 'Duration' },
                    { label: 'Price' },
                    { label: 'Rating' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={packages.length === 0}
                emptyLabel="No packages found"
            >
                {packages.map((p) => (
                    <Tr key={p.id}>
                        <Td>
                            <ThumbCell
                                tint0={p.tint0}
                                tint1={p.tint1}
                                img={p.img}
                                title={p.title}
                                subtitle={p.location}
                            />
                        </Td>
                        <Td className="text-soft">{p.location}</Td>
                        <Td className="text-soft">{p.duration}</Td>
                        <Td>
                            <span className="font-extrabold text-foreground">
                                {formatINR(p.price)}
                            </span>
                        </Td>
                        <Td>
                            <RatingCell value={p.rating} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/packages/${p.id}/edit`}
                                deleteAction={`/admin/packages/${p.id}`}
                                deleteLabel={p.title}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

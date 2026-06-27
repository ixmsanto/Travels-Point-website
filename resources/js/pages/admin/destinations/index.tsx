import { Head, Link } from '@inertiajs/react';
import AdminSearch from '@/components/admin/admin-search';
import {
    DataTable,
    RowActions,
    Td,
    ThumbCell,
    Tr,
} from '@/components/admin/data-table';
import PageHeader from '@/components/admin/page-header';
import MaterialSymbol from '@/components/material-symbol';
import { formatINR } from '@/lib/currency';
import type { Destination } from '@/types';

type Props = {
    destinations: Destination[];
    filters: { search: string };
};

export default function DestinationsIndex({ destinations, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Destinations" />

            <PageHeader
                title="Destinations"
                description={`Showing ${destinations.length} of ${destinations.length}`}
            >
                <Link
                    href="/admin/destinations/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Destination
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/destinations"
                    initial={filters.search}
                    placeholder="Search destinations…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Destination' },
                    { label: 'Country' },
                    { label: 'From' },
                    { label: 'Type' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={destinations.length === 0}
                emptyLabel="No destinations found"
            >
                {destinations.map((d) => (
                    <Tr key={d.id}>
                        <Td>
                            <ThumbCell
                                tint0={d.tint0}
                                tint1={d.tint1}
                                img={d.img}
                                title={d.name}
                                subtitle={d.blurb}
                            />
                        </Td>
                        <Td className="text-soft">{d.country}</Td>
                        <Td>
                            <span className="font-extrabold text-foreground">
                                {formatINR(d.price)}
                            </span>
                        </Td>
                        <Td>
                            <span className="inline-flex rounded-full bg-muted px-[11px] py-1 text-[11.5px] font-bold text-soft">
                                {d.tag}
                            </span>
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/destinations/${d.id}/edit`}
                                deleteAction={`/admin/destinations/${d.id}`}
                                deleteLabel={d.name}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

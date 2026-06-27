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
import MaterialSymbol from '@/components/material-symbol';
import type { GalleryItem } from '@/types';

type Props = {
    items: GalleryItem[];
    filters: { search: string };
};

export default function GalleryIndex({ items, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Gallery" />

            <PageHeader
                title="Gallery"
                description={`Showing ${items.length} of ${items.length}`}
            >
                <Link
                    href="/admin/gallery/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Photo
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/gallery"
                    initial={filters.search}
                    placeholder="Search gallery…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Topic' },
                    { label: 'Category' },
                    { label: 'Published' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={items.length === 0}
                emptyLabel="No gallery items found"
            >
                {items.map((g) => (
                    <Tr key={g.id}>
                        <Td>
                            <ThumbCell
                                tint0={g.tint0}
                                tint1={g.tint1}
                                img={g.img}
                                title={g.topic}
                            />
                        </Td>
                        <Td>
                            <span className="inline-flex rounded-full bg-muted px-[11px] py-1 text-[11.5px] font-bold text-soft">
                                {g.category}
                            </span>
                        </Td>
                        <Td>
                            <BoolCell value={g.is_published} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/gallery/${g.id}/edit`}
                                deleteAction={`/admin/gallery/${g.id}`}
                                deleteLabel={g.topic}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

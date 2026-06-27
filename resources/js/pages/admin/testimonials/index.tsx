import { Head, Link } from '@inertiajs/react';
import AdminSearch from '@/components/admin/admin-search';
import {
    BoolCell,
    DataTable,
    RatingCell,
    RowActions,
    Td,
    ThumbCell,
    Tr,
} from '@/components/admin/data-table';
import PageHeader from '@/components/admin/page-header';
import MaterialSymbol from '@/components/material-symbol';
import type { Testimonial } from '@/types';

type Props = {
    testimonials: Testimonial[];
    filters: { search: string };
};

export default function TestimonialsIndex({ testimonials, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Testimonials" />

            <PageHeader
                title="Testimonials"
                description={`Showing ${testimonials.length} of ${testimonials.length}`}
            >
                <Link
                    href="/admin/testimonials/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Testimonial
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/testimonials"
                    initial={filters.search}
                    placeholder="Search testimonials…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Guest' },
                    { label: 'Trip' },
                    { label: 'Rating' },
                    { label: 'Published' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={testimonials.length === 0}
                emptyLabel="No testimonials found"
            >
                {testimonials.map((t) => (
                    <Tr key={t.id}>
                        <Td>
                            <ThumbCell
                                tint0={t.tint0}
                                tint1={t.tint1}
                                img={t.img}
                                title={t.name}
                                subtitle={t.review}
                            />
                        </Td>
                        <Td className="text-soft">{t.location}</Td>
                        <Td>
                            <RatingCell value={t.rating} />
                        </Td>
                        <Td>
                            <BoolCell value={t.is_published} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/testimonials/${t.id}/edit`}
                                deleteAction={`/admin/testimonials/${t.id}`}
                                deleteLabel={t.name}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

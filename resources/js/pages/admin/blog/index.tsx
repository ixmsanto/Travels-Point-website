import { Head, Link } from '@inertiajs/react';
import AdminSearch from '@/components/admin/admin-search';
import {
    BoolCell,
    DataTable,
    RowActions,
    Td,
    Tr,
} from '@/components/admin/data-table';
import PageHeader from '@/components/admin/page-header';
import MaterialSymbol from '@/components/material-symbol';
import { formatPostDate } from '@/components/public/blog-card';
import type { BlogPost } from '@/types';

type Props = {
    posts: BlogPost[];
    filters: { search: string };
};

function formatDate(value: string | null): string {
    return formatPostDate(value) ?? '—';
}

export default function BlogIndex({ posts, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Blog" />

            <PageHeader
                title="Blog"
                description={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
            >
                <Link
                    href="/admin/blog/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Post
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/blog"
                    initial={filters.search}
                    placeholder="Search posts…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Post' },
                    { label: 'Category' },
                    { label: 'Author' },
                    { label: 'Published on' },
                    { label: 'Live' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={posts.length === 0}
                emptyLabel="No blog posts yet"
            >
                {posts.map((p) => (
                    <Tr key={p.id}>
                        <Td>
                            <div className="flex items-center gap-3">
                                {p.img ? (
                                    <img
                                        src={p.img}
                                        alt=""
                                        className="size-[42px] shrink-0 rounded-[10px] object-cover"
                                    />
                                ) : (
                                    <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[10px] bg-primary-soft text-primary-deep">
                                        <MaterialSymbol name="article" size={22} />
                                    </span>
                                )}
                                <div className="min-w-0">
                                    <p className="truncate font-bold text-foreground">
                                        {p.title}
                                    </p>
                                    <p className="max-w-[280px] truncate text-[12.5px] text-faint">
                                        {p.excerpt}
                                    </p>
                                </div>
                            </div>
                        </Td>
                        <Td className="text-soft">{p.category}</Td>
                        <Td className="text-soft">{p.author}</Td>
                        <Td className="text-soft">
                            {formatDate(p.published_at)}
                        </Td>
                        <Td>
                            <BoolCell value={p.is_published} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/blog/${p.id}/edit`}
                                deleteAction={`/admin/blog/${p.id}`}
                                deleteLabel={p.title}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

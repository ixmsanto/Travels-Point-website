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
import type { TeamMember } from '@/types';

type Props = {
    members: TeamMember[];
    filters: { search: string };
};

function initialsOf(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');
}

export default function TeamIndex({ members, filters }: Props) {
    return (
        <div className="flex flex-col gap-5">
            <Head title="Team" />

            <PageHeader
                title="Team"
                description={`${members.length} ${members.length === 1 ? 'member' : 'members'}`}
            >
                <Link
                    href="/admin/team/create"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-[14px] font-bold text-white shadow-[0_12px_24px_-14px_var(--ring-glow)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                    <MaterialSymbol name="add" size={19} />
                    Add Member
                </Link>
            </PageHeader>

            <div className="flex flex-wrap items-center gap-3">
                <AdminSearch
                    routePath="/admin/team"
                    initial={filters.search}
                    placeholder="Search team…"
                />
            </div>

            <DataTable
                columns={[
                    { label: 'Member' },
                    { label: 'Role' },
                    { label: 'Order' },
                    { label: 'Live' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={members.length === 0}
                emptyLabel="No team members yet"
            >
                {members.map((m) => (
                    <Tr key={m.id}>
                        <Td>
                            <div className="flex items-center gap-3">
                                {m.img ? (
                                    <img
                                        src={m.img}
                                        alt=""
                                        className="size-[42px] shrink-0 rounded-full object-cover"
                                    />
                                ) : (
                                    <span
                                        className="flex size-[42px] shrink-0 items-center justify-center rounded-full font-serif text-[15px] font-extrabold text-white/90"
                                        style={{
                                            background: `linear-gradient(150deg, ${m.tint}, ${m.tint}cc)`,
                                        }}
                                    >
                                        {initialsOf(m.name)}
                                    </span>
                                )}
                                <p className="font-bold text-foreground">
                                    {m.name}
                                </p>
                            </div>
                        </Td>
                        <Td className="text-soft">{m.role}</Td>
                        <Td className="text-soft">{m.sort_order}</Td>
                        <Td>
                            <BoolCell value={m.is_published} />
                        </Td>
                        <Td align="right">
                            <RowActions
                                editHref={`/admin/team/${m.id}/edit`}
                                deleteAction={`/admin/team/${m.id}`}
                                deleteLabel={m.name}
                            />
                        </Td>
                    </Tr>
                ))}
            </DataTable>
        </div>
    );
}

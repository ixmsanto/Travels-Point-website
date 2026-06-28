import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import DeleteButton from '@/components/admin/delete-button';
import { DataTable, Td, Tr } from '@/components/admin/data-table';
import Field from '@/components/admin/field';
import PageHeader from '@/components/admin/page-header';
import MaterialSymbol from '@/components/material-symbol';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { Region } from '@/types';

type Props = { regions: Region[] };

export default function RegionsIndex({ regions }: Props) {
    const create = useForm({ name: '', icon: '', sort_order: 0 });
    const edit = useForm({ name: '', icon: '', sort_order: 0 });
    const [editing, setEditing] = useState<Region | null>(null);

    const submitCreate = (e: React.FormEvent) => {
        e.preventDefault();
        create.post('/admin/regions', {
            preserveScroll: true,
            onSuccess: () => create.reset(),
        });
    };

    const openEdit = (region: Region) => {
        setEditing(region);
        edit.setData({
            name: region.name,
            icon: region.icon ?? '',
            sort_order: region.sort_order,
        });
        edit.clearErrors();
    };

    const submitEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) {
            return;
        }
        edit.put(`/admin/regions/${editing.id}`, {
            preserveScroll: true,
            onSuccess: () => setEditing(null),
        });
    };

    return (
        <div className="flex flex-col gap-5">
            <Head title="Regions" />

            <PageHeader
                title="Regions"
                description="Categories that power the India / International filter tabs on the packages page."
            />

            {/* Add region */}
            <Card className="p-5">
                <form
                    onSubmit={submitCreate}
                    className="grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto_auto]"
                >
                    <Field
                        label="Name"
                        htmlFor="name"
                        error={create.errors.name}
                    >
                        <Input
                            id="name"
                            value={create.data.name}
                            onChange={(e) =>
                                create.setData('name', e.target.value)
                            }
                            placeholder="e.g. Europe Special"
                        />
                    </Field>
                    <Field
                        label="Icon"
                        htmlFor="icon"
                        error={create.errors.icon}
                        hint="Optional Material Symbol name."
                    >
                        <Input
                            id="icon"
                            value={create.data.icon}
                            onChange={(e) =>
                                create.setData('icon', e.target.value)
                            }
                            placeholder="e.g. public"
                        />
                    </Field>
                    <Field
                        label="Sort"
                        htmlFor="sort_order"
                        error={create.errors.sort_order}
                    >
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            className="w-24"
                            value={create.data.sort_order}
                            onChange={(e) =>
                                create.setData(
                                    'sort_order',
                                    Number(e.target.value),
                                )
                            }
                        />
                    </Field>
                    <Button type="submit" disabled={create.processing}>
                        <MaterialSymbol name="add" size={18} />
                        Add region
                    </Button>
                </form>
            </Card>

            <DataTable
                columns={[
                    { label: 'Region' },
                    { label: 'Icon' },
                    { label: 'Packages' },
                    { label: 'Sort' },
                    { label: 'Actions', align: 'right' },
                ]}
                empty={regions.length === 0}
                emptyLabel="No regions yet"
            >
                {regions.map((r) => (
                    <Tr key={r.id}>
                        <Td>
                            <span className="font-bold text-foreground">
                                {r.name}
                            </span>
                        </Td>
                        <Td className="text-soft">
                            {r.icon ? (
                                <span className="inline-flex items-center gap-1.5">
                                    <MaterialSymbol name={r.icon} size={18} />
                                    {r.icon}
                                </span>
                            ) : (
                                <span className="text-faint">—</span>
                            )}
                        </Td>
                        <Td className="text-soft">{r.packages_count ?? 0}</Td>
                        <Td className="text-soft">{r.sort_order}</Td>
                        <Td align="right">
                            <div className="flex items-center justify-end gap-1.5">
                                <button
                                    type="button"
                                    aria-label={`Edit ${r.name}`}
                                    onClick={() => openEdit(r)}
                                    className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-primary-deep transition hover:-translate-y-px hover:border-primary hover:bg-primary-soft"
                                >
                                    <MaterialSymbol name="edit" size={18} />
                                </button>
                                <DeleteButton
                                    action={`/admin/regions/${r.id}`}
                                    label={r.name}
                                    trigger={
                                        <button
                                            type="button"
                                            aria-label={`Delete ${r.name}`}
                                            className="flex size-[34px] items-center justify-center rounded-[9px] border border-border-strong bg-surface-2 text-destructive transition hover:-translate-y-px hover:border-destructive hover:bg-destructive/10"
                                        >
                                            <MaterialSymbol
                                                name="delete"
                                                size={18}
                                            />
                                        </button>
                                    }
                                />
                            </div>
                        </Td>
                    </Tr>
                ))}
            </DataTable>

            {/* Edit dialog */}
            <Dialog
                open={Boolean(editing)}
                onOpenChange={(open) => !open && setEditing(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit region</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="grid gap-4">
                        <Field
                            label="Name"
                            htmlFor="edit_name"
                            error={edit.errors.name}
                            hint="Renaming updates every package in this region."
                        >
                            <Input
                                id="edit_name"
                                value={edit.data.name}
                                onChange={(e) =>
                                    edit.setData('name', e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Icon"
                            htmlFor="edit_icon"
                            error={edit.errors.icon}
                            hint="Optional Material Symbol name."
                        >
                            <Input
                                id="edit_icon"
                                value={edit.data.icon}
                                onChange={(e) =>
                                    edit.setData('icon', e.target.value)
                                }
                                placeholder="e.g. public"
                            />
                        </Field>
                        <Field
                            label="Sort order"
                            htmlFor="edit_sort"
                            error={edit.errors.sort_order}
                        >
                            <Input
                                id="edit_sort"
                                type="number"
                                min={0}
                                value={edit.data.sort_order}
                                onChange={(e) =>
                                    edit.setData(
                                        'sort_order',
                                        Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditing(null)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={edit.processing}>
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

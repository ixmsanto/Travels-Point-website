import { Head, Link, useForm } from '@inertiajs/react';
import Field from '@/components/admin/field';
import ImageField from '@/components/admin/image-field';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { TeamMember } from '@/types';

type Props = { member: TeamMember | null };

function initialsOf(name: string): string {
    return (
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase() ?? '')
            .join('') || '?'
    );
}

export default function TeamForm({ member }: Props) {
    const editing = Boolean(member);
    const form = useForm({
        name: member?.name ?? '',
        role: member?.role ?? '',
        tint: member?.tint ?? '#ea580c',
        img: member?.img ?? '',
        image_file: null as File | null,
        is_published: member?.is_published ?? true,
        sort_order: member?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/team/${member!.id}` : '/admin/team';

        form.transform((data) => {
            const payload: Record<string, unknown> = { ...data };

            if (!(payload.image_file instanceof File)) {
                delete payload.image_file;
            }

            if (editing) {
                payload._method = 'put';
            }

            return payload;
        });

        form.post(url);
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <Head title={editing ? 'Edit team member' : 'New team member'} />
            <PageHeader
                title={editing ? 'Edit team member' : 'New team member'}
                description="The people shown in “Meet our team” on the About page."
            />

            <Card className="p-6">
                <form onSubmit={submit} className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Name"
                            htmlFor="name"
                            error={form.errors.name}
                        >
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData('name', e.target.value)
                                }
                                placeholder="Elena Marlow"
                            />
                        </Field>
                        <Field
                            label="Role"
                            htmlFor="role"
                            error={form.errors.role}
                        >
                            <Input
                                id="role"
                                value={form.data.role}
                                onChange={(e) =>
                                    form.setData('role', e.target.value)
                                }
                                placeholder="Founder & Lead Designer"
                            />
                        </Field>
                    </div>

                    <Field
                        label="Accent colour"
                        htmlFor="tint"
                        error={form.errors.tint}
                        hint="Used for the gradient avatar when no photo is set."
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={form.data.tint}
                                onChange={(e) =>
                                    form.setData('tint', e.target.value)
                                }
                                aria-label="Accent colour"
                                className="size-11 shrink-0 cursor-pointer rounded-[10px] border border-border-strong bg-transparent p-1"
                            />
                            <Input
                                id="tint"
                                value={form.data.tint}
                                onChange={(e) =>
                                    form.setData('tint', e.target.value)
                                }
                                placeholder="#ea580c"
                                className="max-w-[160px]"
                            />
                            {/* Live avatar preview */}
                            <span
                                className="ml-auto flex size-16 items-center justify-center overflow-hidden rounded-full font-serif text-[20px] font-extrabold text-white/90"
                                style={{
                                    background: `linear-gradient(150deg, ${form.data.tint}, ${form.data.tint}cc)`,
                                }}
                            >
                                {form.data.img || form.data.image_file ? (
                                    <img
                                        src={
                                            form.data.image_file
                                                ? URL.createObjectURL(
                                                      form.data.image_file,
                                                  )
                                                : form.data.img
                                        }
                                        alt=""
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    initialsOf(form.data.name)
                                )}
                            </span>
                        </div>
                    </Field>

                    <ImageField
                        label="Photo (optional)"
                        img={form.data.img ?? ''}
                        file={form.data.image_file}
                        aspect={1}
                        error={form.errors.img || form.errors.image_file}
                        onUrl={(url) => form.setData('img', url)}
                        onFile={(file) => form.setData('image_file', file)}
                    />

                    <Field
                        label="Sort order"
                        htmlFor="sort_order"
                        error={form.errors.sort_order}
                    >
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={form.data.sort_order}
                            onChange={(e) =>
                                form.setData('sort_order', Number(e.target.value))
                            }
                        />
                    </Field>

                    <div className="flex items-center justify-between rounded-[12px] border border-border p-4">
                        <div>
                            <Label htmlFor="is_published">Published</Label>
                            <p className="text-[12.5px] text-faint">
                                Show this person on the About page.
                            </p>
                        </div>
                        <Switch
                            id="is_published"
                            checked={form.data.is_published}
                            onCheckedChange={(v) =>
                                form.setData('is_published', v)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
                        <Button asChild variant="outline">
                            <Link href="/admin/team">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Add member'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import Field from '@/components/admin/field';
import ImageField from '@/components/admin/image-field';
import PageHeader from '@/components/admin/page-header';
import TintPicker from '@/components/admin/tint-picker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { GalleryItem } from '@/types';

type Props = { item: GalleryItem | null };

export default function GalleryForm({ item }: Props) {
    const editing = Boolean(item);
    const form = useForm({
        topic: item?.topic ?? '',
        category: item?.category ?? '',
        tint0: item?.tint0 ?? '#1769a8',
        tint1: item?.tint1 ?? '#7cc4ea',
        img: item?.img ?? '',
        image_file: null as File | null,
        is_published: item?.is_published ?? true,
        sort_order: item?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/gallery/${item!.id}` : '/admin/gallery';

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
            <Head title={editing ? 'Edit gallery item' : 'New gallery item'} />
            <PageHeader
                title={editing ? 'Edit gallery item' : 'New gallery item'}
                description="Photos shown in the Travel Gallery on the home page."
            />

            <Card className="p-6">
                <form onSubmit={submit} className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Topic / caption"
                            htmlFor="topic"
                            error={form.errors.topic}
                        >
                            <Input
                                id="topic"
                                value={form.data.topic}
                                onChange={(e) =>
                                    form.setData('topic', e.target.value)
                                }
                                placeholder="Caldera sunset, Oia"
                            />
                        </Field>
                        <Field
                            label="Category"
                            htmlFor="category"
                            error={form.errors.category}
                        >
                            <Input
                                id="category"
                                value={form.data.category}
                                onChange={(e) =>
                                    form.setData('category', e.target.value)
                                }
                                placeholder="Greece"
                            />
                        </Field>
                    </div>

                    <ImageField
                        label="Gallery image"
                        img={form.data.img ?? ''}
                        file={form.data.image_file}
                        aspect={1}
                        error={form.errors.img || form.errors.image_file}
                        onUrl={(url) => form.setData('img', url)}
                        onFile={(file) => form.setData('image_file', file)}
                    />

                    <TintPicker
                        tint0={form.data.tint0}
                        tint1={form.data.tint1}
                        onChange={(field, value) => form.setData(field, value)}
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
                                Show this photo in the public gallery.
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
                            <Link href="/admin/gallery">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create item'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

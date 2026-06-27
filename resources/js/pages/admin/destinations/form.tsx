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
import { Textarea } from '@/components/ui/textarea';
import type { Destination } from '@/types';

type Props = { destination: Destination | null };

export default function DestinationForm({ destination }: Props) {
    const editing = Boolean(destination);
    const form = useForm({
        name: destination?.name ?? '',
        country: destination?.country ?? '',
        price: destination?.price ?? 0,
        tag: destination?.tag ?? '',
        blurb: destination?.blurb ?? '',
        tint0: destination?.tint0 ?? '#1769a8',
        tint1: destination?.tint1 ?? '#7cc4ea',
        img: destination?.img ?? '',
        image_file: null as File | null,
        is_featured: destination?.is_featured ?? true,
        sort_order: destination?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing
            ? `/admin/destinations/${destination!.id}`
            : '/admin/destinations';

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
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
            <Head title={editing ? 'Edit destination' : 'New destination'} />
            <PageHeader
                title={editing ? 'Edit destination' : 'New destination'}
                description="Featured places shown on the home page and contact form."
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
                                placeholder="Santorini"
                            />
                        </Field>
                        <Field
                            label="Country / region"
                            htmlFor="country"
                            error={form.errors.country}
                        >
                            <Input
                                id="country"
                                value={form.data.country}
                                onChange={(e) =>
                                    form.setData('country', e.target.value)
                                }
                                placeholder="Greece"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <Field
                            label="Price from (INR)"
                            htmlFor="price"
                            error={form.errors.price}
                        >
                            <Input
                                id="price"
                                type="number"
                                min={0}
                                value={form.data.price}
                                onChange={(e) =>
                                    form.setData(
                                        'price',
                                        Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                        <Field
                            label="Tag"
                            htmlFor="tag"
                            error={form.errors.tag}
                            hint="e.g. Island, City"
                        >
                            <Input
                                id="tag"
                                value={form.data.tag}
                                onChange={(e) =>
                                    form.setData('tag', e.target.value)
                                }
                                placeholder="Island"
                            />
                        </Field>
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
                                    form.setData(
                                        'sort_order',
                                        Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                    </div>

                    <Field
                        label="Blurb"
                        htmlFor="blurb"
                        error={form.errors.blurb}
                    >
                        <Textarea
                            id="blurb"
                            rows={3}
                            value={form.data.blurb}
                            onChange={(e) =>
                                form.setData('blurb', e.target.value)
                            }
                            placeholder="Whitewashed cliffs, caldera sunsets and the bluest Aegean."
                        />
                    </Field>

                    <ImageField
                        label="Destination image"
                        img={form.data.img ?? ''}
                        file={form.data.image_file}
                        aspect={3 / 2}
                        error={form.errors.img || form.errors.image_file}
                        onUrl={(url) => form.setData('img', url)}
                        onFile={(file) => form.setData('image_file', file)}
                    />

                    <TintPicker
                        tint0={form.data.tint0}
                        tint1={form.data.tint1}
                        onChange={(field, value) => form.setData(field, value)}
                    />

                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                            <Label htmlFor="is_featured">Featured</Label>
                            <p className="text-xs text-muted-foreground">
                                Show this destination on the public home page.
                            </p>
                        </div>
                        <Switch
                            id="is_featured"
                            checked={form.data.is_featured}
                            onCheckedChange={(v) =>
                                form.setData('is_featured', v)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
                        <Button asChild variant="outline">
                            <Link href="/admin/destinations">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create destination'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

DestinationForm.layout = {
    breadcrumbs: [
        { title: 'Destinations', href: '/admin/destinations' },
        { title: 'Edit', href: '/admin/destinations' },
    ],
};

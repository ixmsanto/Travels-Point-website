import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import Field from '@/components/admin/field';
import ImageField from '@/components/admin/image-field';
import PageHeader from '@/components/admin/page-header';
import TintPicker from '@/components/admin/tint-picker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { TourPackage } from '@/types';

type Props = { package: TourPackage | null; regions: string[] };

export default function PackageForm({ package: pkg, regions }: Props) {
    const editing = Boolean(pkg);
    const form = useForm({
        title: pkg?.title ?? '',
        location: pkg?.location ?? '',
        region: pkg?.region ?? regions[0] ?? '',
        duration: pkg?.duration ?? '',
        price: pkg?.price ?? 0,
        rating: pkg?.rating ?? 4.8,
        services: pkg?.services ?? ([] as string[]),
        tint0: pkg?.tint0 ?? '#1769a8',
        tint1: pkg?.tint1 ?? '#7cc4ea',
        img: pkg?.img ?? '',
        image_file: null as File | null,
        is_featured: pkg?.is_featured ?? true,
        sort_order: pkg?.sort_order ?? 0,
    });
    const [service, setService] = useState('');

    const addService = () => {
        const value = service.trim();

        if (!value) {
            return;
        }

        form.setData('services', [...form.data.services, value]);
        setService('');
    };

    const removeService = (index: number) => {
        form.setData(
            'services',
            form.data.services.filter((_, i) => i !== index),
        );
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/packages/${pkg!.id}` : '/admin/packages';

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
            <Head title={editing ? 'Edit package' : 'New package'} />
            <PageHeader
                title={editing ? 'Edit package' : 'New package'}
                description="All-in itineraries shown on the home page."
            />

            <Card className="p-6">
                <form onSubmit={submit} className="grid gap-5">
                    <Field
                        label="Title"
                        htmlFor="title"
                        error={form.errors.title}
                    >
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData('title', e.target.value)
                            }
                            placeholder="Aegean Island Hopper"
                        />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <Field
                            label="Location"
                            htmlFor="location"
                            error={form.errors.location}
                        >
                            <Input
                                id="location"
                                value={form.data.location}
                                onChange={(e) =>
                                    form.setData('location', e.target.value)
                                }
                                placeholder="Greece"
                            />
                        </Field>
                        <Field
                            label="Region"
                            htmlFor="region"
                            error={form.errors.region}
                            hint="Filter tab on the packages page. Manage the list under Regions."
                        >
                            <Select
                                value={form.data.region}
                                onValueChange={(v) =>
                                    form.setData('region', v)
                                }
                            >
                                <SelectTrigger id="region" className="w-full">
                                    <SelectValue placeholder="Select a region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions.map((r) => (
                                        <SelectItem key={r} value={r}>
                                            {r}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field
                            label="Duration"
                            htmlFor="duration"
                            error={form.errors.duration}
                            hint="e.g. 8 Days · 3 Islands"
                        >
                            <Input
                                id="duration"
                                value={form.data.duration}
                                onChange={(e) =>
                                    form.setData('duration', e.target.value)
                                }
                                placeholder="8 Days · 3 Islands"
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
                            label="Rating"
                            htmlFor="rating"
                            error={form.errors.rating}
                        >
                            <Input
                                id="rating"
                                type="number"
                                min={0}
                                max={5}
                                step={0.1}
                                value={form.data.rating}
                                onChange={(e) =>
                                    form.setData(
                                        'rating',
                                        Number(e.target.value),
                                    )
                                }
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
                        label="What's included"
                        error={form.errors.services}
                        hint="Add the services bundled in this package."
                    >
                        <div className="flex flex-wrap gap-2">
                            {form.data.services.map((s, i) => (
                                <span
                                    key={`${s}-${i}`}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft py-1 pr-1.5 pl-3 text-sm text-primary"
                                >
                                    {s}
                                    <button
                                        type="button"
                                        onClick={() => removeService(i)}
                                        className="flex size-5 items-center justify-center rounded-full hover:bg-primary/15"
                                        aria-label={`Remove ${s}`}
                                    >
                                        <X className="size-3.5" />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                            <Input
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addService();
                                    }
                                }}
                                placeholder="e.g. Daily breakfast"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={addService}
                            >
                                <Plus className="size-4" />
                                Add
                            </Button>
                        </div>
                    </Field>

                    <ImageField
                        label="Package image"
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
                                Show this package on the public home page.
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
                            <Link href="/admin/packages">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create package'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

PackageForm.layout = {
    breadcrumbs: [
        { title: 'Tour Packages', href: '/admin/packages' },
        { title: 'Edit', href: '/admin/packages' },
    ],
};

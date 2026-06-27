import { Head, Link, useForm } from '@inertiajs/react';
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
import type { Banner } from '@/types';

type Props = { banner: Banner | null };

export default function BannerForm({ banner }: Props) {
    const editing = Boolean(banner);
    const form = useForm({
        title: banner?.title ?? '',
        subtitle: banner?.subtitle ?? '',
        placement: banner?.placement ?? 'Hero',
        active: banner?.active ?? true,
        tint0: banner?.tint0 ?? '#1769a8',
        tint1: banner?.tint1 ?? '#7cc4ea',
        img: banner?.img ?? '',
        image_file: null as File | null,
        sort_order: banner?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/banners/${banner!.id}` : '/admin/banners';

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
            <Head title={editing ? 'Edit banner' : 'New banner'} />
            <PageHeader
                title={editing ? 'Edit banner' : 'New banner'}
                description="Promotional banners for the home page."
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
                        />
                    </Field>

                    <Field
                        label="Subtitle"
                        htmlFor="subtitle"
                        error={form.errors.subtitle}
                        hint="e.g. Greece · save up to 30%"
                    >
                        <Input
                            id="subtitle"
                            value={form.data.subtitle}
                            onChange={(e) =>
                                form.setData('subtitle', e.target.value)
                            }
                        />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Placement"
                            htmlFor="placement"
                            error={form.errors.placement}
                        >
                            <Select
                                value={form.data.placement}
                                onValueChange={(v) =>
                                    form.setData(
                                        'placement',
                                        v as Banner['placement'],
                                    )
                                }
                            >
                                <SelectTrigger
                                    id="placement"
                                    className="w-full"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Hero">Hero</SelectItem>
                                    <SelectItem value="Strip">Strip</SelectItem>
                                </SelectContent>
                            </Select>
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

                    <ImageField
                        label="Banner image"
                        img={form.data.img ?? ''}
                        file={form.data.image_file}
                        aspect={16 / 9}
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
                            <Label htmlFor="active">Active</Label>
                            <p className="text-xs text-muted-foreground">
                                Display this banner on the home page.
                            </p>
                        </div>
                        <Switch
                            id="active"
                            checked={form.data.active}
                            onCheckedChange={(v) => form.setData('active', v)}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
                        <Button asChild variant="outline">
                            <Link href="/admin/banners">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create banner'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

BannerForm.layout = {
    breadcrumbs: [
        { title: 'Homepage Banners', href: '/admin/banners' },
        { title: 'Edit', href: '/admin/banners' },
    ],
};

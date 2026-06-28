import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
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
    // A banner is either an image or a looping video (which uses the image as
    // its poster). One control picks the mode so the two fields aren't shown
    // as unrelated options.
    const [mediaType, setMediaType] = useState<'image' | 'video'>(
        banner?.video ? 'video' : 'image',
    );
    const form = useForm({
        title: banner?.title ?? '',
        subtitle: banner?.subtitle ?? '',
        placement: banner?.placement ?? 'Hero',
        active: banner?.active ?? true,
        tint0: banner?.tint0 ?? '#1769a8',
        tint1: banner?.tint1 ?? '#7cc4ea',
        img: banner?.img ?? '',
        image_file: null as File | null,
        video: banner?.video ?? '',
        video_file: null as File | null,
        sort_order: banner?.sort_order ?? 0,
    });

    // Preview a freshly picked file, else the saved/typed URL. Object URLs are
    // revoked on change to avoid leaks.
    const videoPreview = useMemo(
        () =>
            form.data.video_file
                ? URL.createObjectURL(form.data.video_file)
                : form.data.video,
        [form.data.video_file, form.data.video],
    );

    useEffect(() => {
        return () => {
            if (form.data.video_file) {
                URL.revokeObjectURL(videoPreview);
            }
        };
    }, [videoPreview, form.data.video_file]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/banners/${banner!.id}` : '/admin/banners';

        form.transform((data) => {
            const payload: Record<string, unknown> = { ...data };

            if (!(payload.image_file instanceof File)) {
                delete payload.image_file;
            }

            if (!(payload.video_file instanceof File)) {
                delete payload.video_file;
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

                    <Field
                        label="Banner media"
                        htmlFor="media_type"
                        hint="Show a still image, or a looping background video (the image below becomes its poster)."
                    >
                        <Select
                            value={mediaType}
                            onValueChange={(v) => {
                                const next = v as 'image' | 'video';
                                setMediaType(next);
                                // Switching back to image clears any video so the
                                // slide is image-only when saved.
                                if (next === 'image') {
                                    form.setData('video', '');
                                    form.setData('video_file', null);
                                }
                            }}
                        >
                            <SelectTrigger id="media_type" className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {mediaType === 'video' && (
                        <Field
                            label="Video"
                            htmlFor="video"
                            error={
                                form.errors.video || form.errors.video_file
                            }
                            hint="MP4 or WebM up to 50 MB — plays muted & looping behind the hero. Keep it short and compressed for fast loading."
                        >
                            <div className="grid gap-3">
                                {videoPreview && (
                                    <video
                                        key={videoPreview}
                                        className="aspect-video w-full rounded-lg border border-border object-cover"
                                        src={videoPreview}
                                        muted
                                        loop
                                        playsInline
                                        controls
                                    />
                                )}
                                <Input
                                    id="video"
                                    placeholder="https://… .mp4  — or upload a file below"
                                    value={form.data.video}
                                    onChange={(e) => {
                                        form.setData('video', e.target.value);
                                        form.setData('video_file', null);
                                    }}
                                />
                                <div className="flex items-center gap-3">
                                    <Input
                                        type="file"
                                        accept="video/mp4,video/webm"
                                        onChange={(e) =>
                                            form.setData(
                                                'video_file',
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    {(form.data.video ||
                                        form.data.video_file) && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                form.setData('video', '');
                                                form.setData(
                                                    'video_file',
                                                    null,
                                                );
                                            }}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Field>
                    )}

                    <ImageField
                        label={
                            mediaType === 'video'
                                ? 'Poster image (optional)'
                                : 'Banner image'
                        }
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

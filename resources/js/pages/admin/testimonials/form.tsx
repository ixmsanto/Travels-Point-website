import { Head, Link, useForm } from '@inertiajs/react';
import Field from '@/components/admin/field';
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
import { Textarea } from '@/components/ui/textarea';
import type { Testimonial } from '@/types';

type Props = { testimonial: Testimonial | null };

export default function TestimonialForm({ testimonial }: Props) {
    const editing = Boolean(testimonial);
    const form = useForm({
        name: testimonial?.name ?? '',
        location: testimonial?.location ?? '',
        rating: testimonial?.rating ?? 5,
        review: testimonial?.review ?? '',
        tint0: testimonial?.tint0 ?? '#1769a8',
        tint1: testimonial?.tint1 ?? '#7cc4ea',
        img: testimonial?.img ?? '',
        is_published: testimonial?.is_published ?? true,
        sort_order: testimonial?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editing) {
            form.put(`/admin/testimonials/${testimonial!.id}`);
        } else {
            form.post('/admin/testimonials');
        }
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
            <Head title={editing ? 'Edit testimonial' : 'New testimonial'} />
            <PageHeader
                title={editing ? 'Edit testimonial' : 'New testimonial'}
                description="Traveler reviews shown across the site."
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
                                placeholder="Aisha Rahman"
                            />
                        </Field>
                        <Field
                            label="Location"
                            htmlFor="location"
                            error={form.errors.location}
                            hint="e.g. Honeymoon · Maldives"
                        >
                            <Input
                                id="location"
                                value={form.data.location}
                                onChange={(e) =>
                                    form.setData('location', e.target.value)
                                }
                                placeholder="Honeymoon · Maldives"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Rating"
                            htmlFor="rating"
                            error={form.errors.rating}
                        >
                            <Select
                                value={String(form.data.rating)}
                                onValueChange={(v) =>
                                    form.setData('rating', Number(v))
                                }
                            >
                                <SelectTrigger id="rating">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">
                                        5 — Excellent
                                    </SelectItem>
                                    <SelectItem value="4">4 — Great</SelectItem>
                                    <SelectItem value="3">3 — Good</SelectItem>
                                    <SelectItem value="2">2 — Fair</SelectItem>
                                    <SelectItem value="1">1 — Poor</SelectItem>
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
                        label="Review"
                        htmlFor="review"
                        error={form.errors.review}
                    >
                        <Textarea
                            id="review"
                            rows={4}
                            value={form.data.review}
                            onChange={(e) =>
                                form.setData('review', e.target.value)
                            }
                            placeholder="Every detail was handled flawlessly — the trip of a lifetime."
                        />
                    </Field>

                    <Field
                        label="Image URL"
                        htmlFor="img"
                        error={form.errors.img}
                        hint="Optional avatar image — leave empty to use the gradient initial."
                    >
                        <Input
                            id="img"
                            value={form.data.img ?? ''}
                            onChange={(e) =>
                                form.setData('img', e.target.value)
                            }
                            placeholder="https://…"
                        />
                    </Field>

                    <TintPicker
                        tint0={form.data.tint0}
                        tint1={form.data.tint1}
                        onChange={(field, value) => form.setData(field, value)}
                    />

                    <div className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                            <Label htmlFor="is_published">Published</Label>
                            <p className="text-xs text-muted-foreground">
                                Show this review on the public site.
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
                            <Link href="/admin/testimonials">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create testimonial'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

TestimonialForm.layout = {
    breadcrumbs: [
        { title: 'Testimonials', href: '/admin/testimonials' },
        { title: 'Edit', href: '/admin/testimonials' },
    ],
};

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
import { Textarea } from '@/components/ui/textarea';
import type { Offer } from '@/types';

type Props = { offer: Offer | null };

export default function OfferForm({ offer }: Props) {
    const editing = Boolean(offer);
    const form = useForm({
        title: offer?.title ?? '',
        discount: offer?.discount ?? 0,
        description: offer?.description ?? '',
        expiry: offer?.expiry ?? '',
        cta: offer?.cta ?? 'Book Now',
        cta_url: offer?.cta_url ?? '#',
        status: offer?.status ?? 'Active',
        featured: offer?.featured ?? true,
        tint0: offer?.tint0 ?? '#1769a8',
        tint1: offer?.tint1 ?? '#7cc4ea',
        img: offer?.img ?? '',
        image_file: null as File | null,
        sort_order: offer?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/offers/${offer!.id}` : '/admin/offers';

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
            <Head title={editing ? 'Edit offer' : 'New offer'} />
            <PageHeader
                title={editing ? 'Edit offer' : 'New offer'}
                description="Promotions with a discount and expiry date."
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
                            placeholder="Summer Escape"
                        />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-3">
                        <Field
                            label="Discount (%)"
                            htmlFor="discount"
                            error={form.errors.discount}
                        >
                            <Input
                                id="discount"
                                type="number"
                                min={0}
                                max={100}
                                value={form.data.discount}
                                onChange={(e) =>
                                    form.setData(
                                        'discount',
                                        Number(e.target.value),
                                    )
                                }
                            />
                        </Field>
                        <Field
                            label="Expiry"
                            htmlFor="expiry"
                            error={form.errors.expiry}
                        >
                            <Input
                                id="expiry"
                                type="date"
                                value={form.data.expiry}
                                onChange={(e) =>
                                    form.setData('expiry', e.target.value)
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
                        label="Description"
                        htmlFor="description"
                        error={form.errors.description}
                    >
                        <Textarea
                            id="description"
                            rows={3}
                            value={form.data.description}
                            onChange={(e) =>
                                form.setData('description', e.target.value)
                            }
                            placeholder="Up to 30% off handpicked island getaways."
                        />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Status"
                            htmlFor="status"
                            error={form.errors.status}
                        >
                            <Select
                                value={form.data.status}
                                onValueChange={(v) =>
                                    form.setData('status', v as Offer['status'])
                                }
                            >
                                <SelectTrigger id="status" className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Scheduled">
                                        Scheduled
                                    </SelectItem>
                                    <SelectItem value="Expired">
                                        Expired
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field
                            label="CTA label"
                            htmlFor="cta"
                            error={form.errors.cta}
                        >
                            <Input
                                id="cta"
                                value={form.data.cta}
                                onChange={(e) =>
                                    form.setData('cta', e.target.value)
                                }
                                placeholder="Book Now"
                            />
                        </Field>
                    </div>

                    <Field
                        label="CTA URL"
                        htmlFor="cta_url"
                        error={form.errors.cta_url}
                    >
                        <Input
                            id="cta_url"
                            value={form.data.cta_url}
                            onChange={(e) =>
                                form.setData('cta_url', e.target.value)
                            }
                            placeholder="#"
                        />
                    </Field>

                    <ImageField
                        label="Offer image"
                        img={form.data.img ?? ''}
                        file={form.data.image_file}
                        aspect={4 / 3}
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
                            <Label htmlFor="featured">Featured</Label>
                            <p className="text-xs text-muted-foreground">
                                Highlight this offer on the home page.
                            </p>
                        </div>
                        <Switch
                            id="featured"
                            checked={form.data.featured}
                            onCheckedChange={(v) => form.setData('featured', v)}
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
                        <Button asChild variant="outline">
                            <Link href="/admin/offers">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create offer'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

OfferForm.layout = {
    breadcrumbs: [
        { title: 'Offers', href: '/admin/offers' },
        { title: 'Edit', href: '/admin/offers' },
    ],
};

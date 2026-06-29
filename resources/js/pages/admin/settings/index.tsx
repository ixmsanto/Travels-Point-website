import { Head, useForm } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Linkedin,
    Music2,
    Twitter,
    Youtube,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Field from '@/components/admin/field';
import PageHeader from '@/components/admin/page-header';
import MaterialSymbol from '@/components/material-symbol';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import type { SiteSettings, SocialPlatform } from '@/types';

type Props = { settings: SiteSettings };

type SocialField = {
    key: SocialPlatform;
    activeKey: `${SocialPlatform}_active`;
    label: string;
    Icon: LucideIcon;
    placeholder: string;
};

const socialFields: SocialField[] = [
    {
        key: 'facebook',
        activeKey: 'facebook_active',
        label: 'Facebook',
        Icon: Facebook,
        placeholder: 'https://facebook.com/travelspoint',
    },
    {
        key: 'instagram',
        activeKey: 'instagram_active',
        label: 'Instagram',
        Icon: Instagram,
        placeholder: 'https://instagram.com/travelspoint',
    },
    {
        key: 'youtube',
        activeKey: 'youtube_active',
        label: 'YouTube',
        Icon: Youtube,
        placeholder: 'https://youtube.com/@travelspoint',
    },
    {
        key: 'twitter',
        activeKey: 'twitter_active',
        label: 'X (Twitter)',
        Icon: Twitter,
        placeholder: 'https://x.com/travelspoint',
    },
    {
        key: 'linkedin',
        activeKey: 'linkedin_active',
        label: 'LinkedIn',
        Icon: Linkedin,
        placeholder: 'https://linkedin.com/company/travelspoint',
    },
    {
        key: 'tiktok',
        activeKey: 'tiktok_active',
        label: 'TikTok',
        Icon: Music2,
        placeholder: 'https://tiktok.com/@travelspoint',
    },
];

export default function SettingsIndex({ settings }: Props) {
    const form = useForm<SiteSettings>({
        phone: settings.phone ?? '',
        whatsapp: settings.whatsapp ?? '',
        email: settings.email ?? '',
        address: settings.address ?? '',
        facebook: settings.facebook ?? '',
        instagram: settings.instagram ?? '',
        youtube: settings.youtube ?? '',
        twitter: settings.twitter ?? '',
        linkedin: settings.linkedin ?? '',
        tiktok: settings.tiktok ?? '',
        facebook_active: settings.facebook_active ?? true,
        instagram_active: settings.instagram_active ?? true,
        youtube_active: settings.youtube_active ?? true,
        twitter_active: settings.twitter_active ?? true,
        linkedin_active: settings.linkedin_active ?? true,
        tiktok_active: settings.tiktok_active ?? true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.patch('/admin/settings', { preserveScroll: true });
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6">
            <Head title="Site settings" />
            <PageHeader
                title="Site Settings"
                description="Contact channels and social media links shown across the public website."
            />

            <form onSubmit={submit} className="flex flex-col gap-6">
                {/* ── Contact channels ─────────────────────────────── */}
                <Card className="p-6">
                    <div className="mb-5 flex items-center gap-2.5">
                        <MaterialSymbol
                            name="contact_phone"
                            size={20}
                            className="text-primary-deep"
                        />
                        <h2 className="text-[16px] font-extrabold text-foreground">
                            Contact channels
                        </h2>
                    </div>

                    <div className="grid gap-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <Field
                                label="Phone"
                                htmlFor="phone"
                                error={form.errors.phone}
                                hint="Shown in the header bar and footer."
                            >
                                <Input
                                    id="phone"
                                    value={form.data.phone}
                                    onChange={(e) =>
                                        form.setData('phone', e.target.value)
                                    }
                                    placeholder="+971 4 555 0192"
                                />
                            </Field>
                            <Field
                                label="WhatsApp number"
                                htmlFor="whatsapp"
                                error={form.errors.whatsapp}
                                hint="Used for the floating chat button (wa.me link)."
                            >
                                <Input
                                    id="whatsapp"
                                    value={form.data.whatsapp}
                                    onChange={(e) =>
                                        form.setData('whatsapp', e.target.value)
                                    }
                                    placeholder="+971 4 555 0192"
                                />
                            </Field>
                        </div>

                        <Field
                            label="Email"
                            htmlFor="email"
                            error={form.errors.email}
                        >
                            <Input
                                id="email"
                                type="email"
                                value={form.data.email}
                                onChange={(e) =>
                                    form.setData('email', e.target.value)
                                }
                                placeholder="hello@travelspoint.com"
                            />
                        </Field>

                        <Field
                            label="Address"
                            htmlFor="address"
                            error={form.errors.address}
                        >
                            <Input
                                id="address"
                                value={form.data.address}
                                onChange={(e) =>
                                    form.setData('address', e.target.value)
                                }
                                placeholder="Office 1204, Marina Plaza, Dubai Marina, UAE"
                            />
                        </Field>
                    </div>
                </Card>

                {/* ── Social media ─────────────────────────────────── */}
                <Card className="p-6">
                    <div className="mb-5 flex items-center gap-2.5">
                        <MaterialSymbol
                            name="share"
                            size={20}
                            className="text-primary-deep"
                        />
                        <h2 className="text-[16px] font-extrabold text-foreground">
                            Social media links
                        </h2>
                    </div>
                    <p className="mb-5 text-[13px] text-faint">
                        Paste the full profile URL. Leave a field empty to hide
                        that icon on the website.
                    </p>

                    <div className="grid gap-5 sm:grid-cols-2">
                        {socialFields.map(
                            ({ key, activeKey, label, Icon, placeholder }) => {
                                const active = form.data[activeKey];

                                return (
                                    <div key={key} className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <label
                                                htmlFor={key}
                                                className="text-[13px] font-bold text-soft"
                                            >
                                                {label}
                                            </label>
                                            <span className="flex items-center gap-2">
                                                <span className="text-[12px] font-semibold text-faint">
                                                    {active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                                <Switch
                                                    checked={active}
                                                    onCheckedChange={(v) =>
                                                        form.setData(
                                                            activeKey,
                                                            v,
                                                        )
                                                    }
                                                    aria-label={`Show ${label} icon on the site`}
                                                />
                                            </span>
                                        </div>
                                        <div
                                            className={
                                                active
                                                    ? 'relative'
                                                    : 'relative opacity-50'
                                            }
                                        >
                                            <Icon
                                                size={17}
                                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-faint"
                                            />
                                            <Input
                                                id={key}
                                                type="url"
                                                className="pl-9"
                                                value={form.data[key]}
                                                onChange={(e) =>
                                                    form.setData(
                                                        key,
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={placeholder}
                                            />
                                        </div>
                                        {form.errors[key] && (
                                            <p className="flex items-center gap-1 text-[12.5px] font-semibold text-destructive">
                                                <MaterialSymbol
                                                    name="error"
                                                    size={14}
                                                />
                                                {form.errors[key]}
                                            </p>
                                        )}
                                    </div>
                                );
                            },
                        )}
                    </div>
                </Card>

                <div className="flex items-center justify-end gap-3">
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? 'Saving…' : 'Save settings'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

import { Head, Link } from '@inertiajs/react';
import PageHeader from '@/components/admin/page-header';
import StatCard from '@/components/admin/stat-card';
import StatusBadge from '@/components/admin/status-badge';
import GradientThumb from '@/components/gradient-thumb';
import MaterialSymbol from '@/components/material-symbol';
import type { Inquiry, Offer } from '@/types';

type Props = {
    stats: {
        activeOffers: number;
        destinations: number;
        newInquiries: number;
        packages: number;
        testimonials: number;
        banners: number;
    };
    recentOffers: Offer[];
    recentInquiries: Inquiry[];
};

export default function Dashboard({
    stats,
    recentOffers,
    recentInquiries,
}: Props) {
    return (
        <div className="flex flex-col gap-6">
            <Head title="Dashboard" />

            <PageHeader
                title="Welcome back ✈️"
                description="A snapshot of your travel storefront and recent activity."
            />

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
                <StatCard
                    label="Active Offers"
                    value={stats.activeOffers}
                    icon="local_offer"
                    tone="blue"
                    href="/admin/offers"
                />
                <StatCard
                    label="Destinations"
                    value={stats.destinations}
                    icon="public"
                    tone="orange"
                    href="/admin/destinations"
                />
                <StatCard
                    label="New Inquiries"
                    value={stats.newInquiries}
                    icon="mark_email_unread"
                    tone="green"
                    href="/admin/inquiries"
                />
                <StatCard
                    label="Tour Packages"
                    value={stats.packages}
                    icon="luggage"
                    tone="deep"
                    href="/admin/packages"
                />
            </div>

            <div className="grid gap-5 lg:grid-cols-5">
                {/* Recent offers */}
                <section className="overflow-hidden rounded-[18px] border border-border bg-surface shadow-[var(--shadow-sm)] lg:col-span-3">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <h2 className="text-[17px] font-extrabold text-foreground">
                            Latest offers
                        </h2>
                        <Link
                            href="/admin/offers"
                            className="inline-flex items-center gap-1 text-[13.5px] font-bold text-primary transition-all hover:gap-1.5"
                        >
                            View all
                            <MaterialSymbol name="arrow_forward" size={16} />
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {recentOffers.map((o) => (
                            <div
                                key={o.id}
                                className="flex items-center gap-3.5 px-5 py-3.5"
                            >
                                <GradientThumb
                                    tint0={o.tint0}
                                    tint1={o.tint1}
                                    img={o.img}
                                    rounded="rounded-[10px]"
                                    className="size-10 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[14px] font-bold text-foreground">
                                        {o.title}
                                    </p>
                                    <p className="text-[12.5px] text-faint">
                                        {o.discount}% off
                                    </p>
                                </div>
                                <StatusBadge status={o.status} />
                            </div>
                        ))}
                        {recentOffers.length === 0 && (
                            <p className="px-5 py-6 text-[14px] text-faint">
                                No offers yet.
                            </p>
                        )}
                    </div>
                </section>

                {/* Recent inquiries */}
                <section className="overflow-hidden rounded-[18px] border border-border bg-surface shadow-[var(--shadow-sm)] lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-border px-5 py-4">
                        <h2 className="text-[17px] font-extrabold text-foreground">
                            Recent inquiries
                        </h2>
                        <Link
                            href="/admin/inquiries"
                            className="inline-flex items-center gap-1 text-[13.5px] font-bold text-primary transition-all hover:gap-1.5"
                        >
                            View all
                            <MaterialSymbol name="arrow_forward" size={16} />
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {recentInquiries.map((i) => (
                            <div key={i.id} className="px-5 py-3.5">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="truncate text-[14px] font-bold text-foreground">
                                        {i.name}
                                    </p>
                                    <StatusBadge status={i.status} />
                                </div>
                                <p className="mt-0.5 truncate text-[12.5px] text-faint">
                                    {i.destination ?? 'General'} · {i.email}
                                </p>
                            </div>
                        ))}
                        {recentInquiries.length === 0 && (
                            <p className="px-5 py-6 text-[14px] text-faint">
                                No inquiries yet.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

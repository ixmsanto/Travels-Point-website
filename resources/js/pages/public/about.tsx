import { Head, Link } from '@inertiajs/react';
import MaterialSymbol from '@/components/material-symbol';
import { Eyebrow, SectionHeading } from '@/components/public/section-heading';

type Props = {
    destinationCount: number;
};

const values = [
    { icon: 'edit_note', label: 'Tailor-made, always' },
    { icon: 'verified_user', label: 'Trusted & protected' },
    { icon: 'support_agent', label: '24/7 on-trip support' },
    { icon: 'public', label: 'Local expertise' },
    { icon: 'savings', label: 'Best-price promise' },
    { icon: 'eco', label: 'Travel that gives back' },
];

const timeline = [
    {
        year: '2010',
        title: 'Three planners, one desk',
        text: 'Travels Point opens in Dubai Marina with a simple belief: a great trip should feel effortless for you and obsessive for us.',
    },
    {
        year: '2014',
        title: 'Beyond the Gulf',
        text: 'We cross 30 destinations, adding honeymoon and family specialists as word of mouth carries us across the region.',
    },
    {
        year: '2018',
        title: 'A team of specialists',
        text: 'On-the-ground partners in every region give our travelers access you simply cannot book online.',
    },
    {
        year: '2022',
        title: '100+ destinations',
        text: 'Group tours, corporate retreats and bespoke expeditions take us past a hundred countries on six continents.',
    },
    {
        year: 'Today',
        title: '24,000+ journeys crafted',
        text: 'A 4.9-star team of travel designers, available around the clock, still answering the phone at 2am.',
    },
];

const trust = [
    {
        icon: 'lock',
        title: 'Secure & insured',
        text: 'Licensed, bonded and ATOL-protected. Your payments and bookings are fully secured, every time.',
    },
    {
        icon: 'price_check',
        title: 'No hidden fees',
        text: 'One transparent quote with everything included — what we say is what you pay.',
    },
    {
        icon: 'schedule',
        title: 'Always reachable',
        text: 'A real human in your timezone, from first idea to the flight home and every detour between.',
    },
    {
        icon: 'verified',
        title: 'Award-winning',
        text: 'Recognised by Travel + Leisure and Virtuoso for service travelers actually rave about.',
    },
];

const team = [
    { name: 'Elena Marlow', role: 'Founder & Lead Designer', tint: '#0b4ea2' },
    { name: 'Rohan Mehta', role: 'Head of Asia & Honeymoons', tint: '#f57c00' },
    { name: 'Sofia Castellano', role: 'Europe & Luxury Stays', tint: '#3c9440' },
    { name: 'Daniel Okonkwo', role: 'Africa & Expeditions', tint: '#2f6fe0' },
];

const certs = [
    { icon: 'workspace_premium', name: 'T+L A-List', sub: '2024 · 2025' },
    { icon: 'verified', name: 'Virtuoso', sub: 'Member agency' },
    { icon: 'flight', name: 'IATA', sub: 'Accredited' },
    { icon: 'shield', name: 'ATOL', sub: 'Protected' },
    { icon: 'travel_explore', name: 'ASTA', sub: 'Verified' },
];

export default function About({ destinationCount }: Props) {
    const heroStats = [
        { value: '24k+', label: 'Happy travelers' },
        { value: `${destinationCount || 120}+`, label: 'Destinations' },
        { value: '4.9/5', label: 'Avg. rating' },
    ];

    return (
        <>
            <Head title="About — Travels Point" />

            {/* ===== HEADER ===== */}
            <section className="bg-background px-5 pt-[clamp(48px,7vw,92px)] pb-[clamp(40px,5vw,64px)] sm:px-8">
                <div className="mx-auto grid max-w-[1240px] items-center gap-[clamp(28px,4vw,56px)] lg:grid-cols-2">
                    <div data-reveal>
                        <Eyebrow>About Travels Point</Eyebrow>
                        <h1 className="mt-4 font-serif text-[clamp(38px,5.4vw,66px)] leading-[1.04] font-semibold tracking-tight text-foreground">
                            Sixteen years of turning maps into memories
                        </h1>
                        <p className="mt-5 text-[clamp(15px,1.5vw,18px)] leading-[1.75] text-soft">
                            Travels Point began in 2010 with a simple belief: a
                            great trip should feel effortless for you and
                            obsessive for us. What started as three planners at a
                            single desk is now a team of specialists who have
                            designed journeys across 120+ destinations on six
                            continents.
                        </p>
                        <p className="mt-4 text-[clamp(15px,1.5vw,18px)] leading-[1.75] text-soft">
                            We are not a booking website. We are the people who
                            answer the phone at 2am, remember that you like a high
                            floor, and know which café has the view worth the
                            detour.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-[26px]">
                            {heroStats.map((s, i) => (
                                <div key={s.label} className="flex items-center gap-[26px]">
                                    {i > 0 && (
                                        <span className="h-9 w-px bg-border" />
                                    )}
                                    <div>
                                        <p className="font-serif text-[30px] leading-none font-semibold text-foreground">
                                            {s.value}
                                        </p>
                                        <p className="mt-1 text-[13px] text-faint">
                                            {s.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div data-reveal className="relative">
                        <div
                            className="relative h-[clamp(320px,42vw,460px)] overflow-hidden rounded-[26px] shadow-[var(--shadow-lg)]"
                            style={{
                                background:
                                    'linear-gradient(150deg,#083b7c,#1565c5)',
                            }}
                        >
                            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_22px)]" />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(6,18,30,0.45))]" />
                            <MaterialSymbol
                                name="travel_explore"
                                size={120}
                                className="tp-float2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20"
                            />
                        </div>
                        <div className="absolute -bottom-3.5 -left-3.5 flex items-center gap-3 rounded-[16px] border border-border bg-surface p-[15px] shadow-[var(--shadow-md)]">
                            <span className="flex size-[42px] items-center justify-center rounded-[12px] bg-gold-soft text-gold">
                                <MaterialSymbol name="workspace_premium" size={23} />
                            </span>
                            <div>
                                <p className="text-[14px] font-extrabold text-foreground">
                                    T+L A-List
                                </p>
                                <p className="text-[12px] text-faint">
                                    2024 · 2025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MISSION / VISION + VALUES ===== */}
            <section className="bg-bg-2 px-5 py-[clamp(56px,8vw,110px)] sm:px-8">
                <div className="mx-auto max-w-[1240px]">
                    <div data-stagger className="grid gap-5.5 sm:grid-cols-2">
                        <article className="rounded-[20px] border border-border bg-surface p-[30px] shadow-[var(--shadow-sm)]">
                            <span className="mb-5 flex size-[54px] items-center justify-center rounded-[15px] bg-primary-soft text-primary-deep">
                                <MaterialSymbol name="rocket_launch" size={27} />
                            </span>
                            <h2 className="font-serif text-[30px] font-semibold text-foreground">
                                Our Mission
                            </h2>
                            <p className="mt-2.5 text-[15.5px] leading-[1.7] text-soft">
                                To turn the world&rsquo;s most beautiful places
                                into journeys that feel effortless, personal and
                                unforgettable — for every kind of traveler.
                            </p>
                        </article>
                        <article className="rounded-[20px] border border-border bg-surface p-[30px] shadow-[var(--shadow-sm)]">
                            <span className="mb-5 flex size-[54px] items-center justify-center rounded-[15px] bg-gold-soft text-gold">
                                <MaterialSymbol name="visibility" size={27} />
                            </span>
                            <h2 className="font-serif text-[30px] font-semibold text-foreground">
                                Our Vision
                            </h2>
                            <p className="mt-2.5 text-[15.5px] leading-[1.7] text-soft">
                                To be the most trusted name in tailor-made travel
                                — the first call for anyone who wants to explore
                                better, further and deeper.
                            </p>
                        </article>
                    </div>

                    <div
                        data-stagger
                        className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {values.map((v) => (
                            <div
                                key={v.label}
                                className="flex items-center gap-3.5 rounded-[15px] border border-border bg-surface px-5 py-4.5"
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-surface-2 text-primary-deep">
                                    <MaterialSymbol name={v.icon} size={21} />
                                </span>
                                <span className="text-[15px] font-bold text-foreground">
                                    {v.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR STORY (timeline) ===== */}
            <section className="bg-background px-5 py-[clamp(56px,8vw,110px)] sm:px-8">
                <div className="mx-auto max-w-[880px]">
                    <SectionHeading
                        eyebrow="Our Story"
                        title="How we got here"
                        reveal
                    />
                    <div data-stagger className="relative mt-12">
                        <span className="absolute top-2 bottom-2 left-[21px] w-0.5 bg-gradient-to-b from-primary to-gold opacity-40" />
                        {timeline.map((e) => (
                            <div
                                key={e.year}
                                className="relative flex gap-6 pb-7.5 last:pb-0"
                            >
                                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface shadow-[var(--shadow-sm)]">
                                    <MaterialSymbol
                                        name="flag"
                                        size={20}
                                        className="text-primary-deep"
                                    />
                                </span>
                                <div className="pt-0.5">
                                    <span className="text-[13px] font-extrabold tracking-[0.06em] text-gold">
                                        {e.year}
                                    </span>
                                    <h3 className="mt-1 text-[19px] font-bold text-foreground">
                                        {e.title}
                                    </h3>
                                    <p className="mt-1.5 text-[15px] leading-[1.65] text-soft">
                                        {e.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY TRAVELERS TRUST US ===== */}
            <section className="bg-bg-2 px-5 py-[clamp(56px,8vw,110px)] sm:px-8">
                <div className="mx-auto max-w-[1240px]">
                    <SectionHeading
                        eyebrow="Why travelers trust us"
                        title="Confidence, built in from day one"
                        reveal
                    />
                    <div
                        data-stagger
                        className="mt-12 grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {trust.map((t) => (
                            <article
                                key={t.title}
                                className="rounded-[20px] border border-border bg-surface p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1.5 hover:shadow-[var(--shadow-md)]"
                            >
                                <span className="mb-4.5 flex size-[50px] items-center justify-center rounded-[14px] bg-gradient-to-br from-primary-soft to-gold-soft text-primary-deep">
                                    <MaterialSymbol name={t.icon} size={25} />
                                </span>
                                <h3 className="text-[17px] font-bold text-foreground">
                                    {t.title}
                                </h3>
                                <p className="mt-2 text-[14px] leading-[1.6] text-soft">
                                    {t.text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TEAM ===== */}
            <section className="bg-background px-5 py-[clamp(56px,8vw,110px)] sm:px-8">
                <div className="mx-auto max-w-[1240px]">
                    <SectionHeading
                        eyebrow="Meet our team"
                        title="The people behind your itinerary"
                        reveal
                    />
                    <div
                        data-stagger
                        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {team.map((m) => (
                            <article
                                key={m.name}
                                className="overflow-hidden rounded-[22px] border border-border bg-surface shadow-[var(--shadow-sm)] transition hover:-translate-y-2 hover:shadow-[var(--shadow-lg)]"
                            >
                                <div
                                    className="relative flex h-[230px] items-center justify-center"
                                    style={{
                                        background: `linear-gradient(150deg, ${m.tint}, ${m.tint}cc)`,
                                    }}
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_22px)]" />
                                    <span className="font-serif text-[44px] font-extrabold text-white/90">
                                        {m.name
                                            .split(' ')
                                            .map((w) => w[0])
                                            .join('')}
                                    </span>
                                </div>
                                <div className="p-5 text-center">
                                    <p className="text-[17px] font-extrabold text-foreground">
                                        {m.name}
                                    </p>
                                    <p className="mt-0.5 text-[13.5px] font-semibold text-primary-deep">
                                        {m.role}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CERTIFICATIONS ===== */}
            <section
                className="px-5 py-[clamp(56px,8vw,100px)] sm:px-8"
                style={{ background: 'linear-gradient(165deg,#062a52,#083b7c)' }}
            >
                <div className="mx-auto max-w-[1240px]">
                    <SectionHeading
                        eyebrow="Certifications & achievements"
                        eyebrowIcon="military_tech"
                        eyebrowTone="gold"
                        title="Accredited, awarded, accountable"
                        invert
                        reveal
                    />
                    <div
                        data-stagger
                        className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5"
                    >
                        {certs.map((c) => (
                            <div
                                key={c.name}
                                className="rounded-[18px] border border-white/12 bg-white/[0.06] p-7 text-center backdrop-blur"
                            >
                                <span className="mx-auto mb-3.5 flex size-[52px] items-center justify-center rounded-[14px] bg-gold/15 text-gold">
                                    <MaterialSymbol name={c.icon} size={26} />
                                </span>
                                <p className="text-[15.5px] font-extrabold text-white">
                                    {c.name}
                                </p>
                                <p className="mt-0.5 text-[12.5px] text-white/60">
                                    {c.sub}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-[14px] bg-white px-8 py-4 text-[16px] font-extrabold text-[#083b7c] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.4)] transition hover:-translate-y-0.5"
                        >
                            Start planning
                            <MaterialSymbol name="arrow_forward" size={18} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

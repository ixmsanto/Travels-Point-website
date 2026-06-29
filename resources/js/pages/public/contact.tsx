import { Form, Head, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { CtaButton } from '@/components/public/button';
import { Section } from '@/components/public/section';
import { Eyebrow } from '@/components/public/section-heading';
import { IconTile } from '@/components/public/ui';
import type { ContactDetails } from '@/types';

type Props = {
    destinations: string[];
    contact: ContactDetails;
};

const fieldClass =
    'w-full rounded-control border border-border-strong bg-surface-2 px-[15px] py-[13px] text-[15px] text-foreground outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_var(--ring-glow)] placeholder:text-faint';

function FieldLabel({
    icon,
    children,
    className,
}: {
    icon: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <span
            className={`flex items-center gap-1.5 text-[13px] font-bold text-soft ${className ?? ''}`}
        >
            <MaterialSymbol
                name={icon}
                size={16}
                className="text-primary-deep"
            />
            {children}
        </span>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) {
        return null;
    }

    return (
        <span className="flex items-center gap-1 text-[12.5px] font-semibold text-destructive">
            <MaterialSymbol name="error" size={14} />
            {message}
        </span>
    );
}

export default function Contact({ destinations, contact }: Props) {
    const page = usePage();
    const presetDestination =
        new URL(page.url, 'http://x').searchParams.get('destination') ?? '';

    const channels = [
        {
            icon: 'location_on',
            label: 'Visit us',
            value: contact.address,
        },
        {
            icon: 'call',
            label: 'Call us',
            value: contact.phone,
            href: `tel:${contact.phone}`,
        },
        {
            icon: 'mail',
            label: 'Email us',
            value: contact.email,
            href: `mailto:${contact.email}`,
        },
        {
            icon: 'schedule',
            label: 'Hours',
            value: 'Sun–Thu · 9:00am – 7:00pm · Sat · 10:00am – 4:00pm',
        },
    ];

    return (
        <>
            <Head title="Contact — Travels Point" />

            {/* ===== HEADER ===== */}
            <Section
                bg="surface"
                spacing="none"
                width="prose"
                className="pt-[clamp(48px,7vw,86px)] pb-[clamp(24px,3vw,36px)]"
            >
                <div data-reveal className="text-center">
                    <Eyebrow className="justify-center">Get in touch</Eyebrow>
                    <h1 className="mt-4 font-serif text-[clamp(38px,5.4vw,64px)] leading-[1.04] font-semibold tracking-tight text-foreground">
                        Let&rsquo;s plan something unforgettable
                    </h1>
                    <p className="mx-auto mt-4 max-w-[560px] text-[clamp(15px,1.5vw,18px)] leading-[1.7] text-soft">
                        Tell us a little about your trip and a travel specialist
                        will get back to you within one business day — usually
                        much sooner.
                    </p>
                </div>
            </Section>

            {/* ===== INFO + FORM ===== */}
            <Section
                bg="surface"
                spacing="none"
                className="pt-[clamp(20px,3vw,40px)] pb-[clamp(56px,8vw,90px)]"
                containerClassName="max-w-[1180px]"
            >
                <div className="grid items-start gap-6 lg:grid-cols-2">
                    {/* Info column */}
                    <div data-stagger className="flex flex-col gap-3.5">
                        {channels.map((c) => (
                            <div
                                key={c.label}
                                className="flex items-start gap-3.5 rounded-card border border-border bg-surface p-[22px] shadow-[var(--shadow-sm)]"
                            >
                                <IconTile
                                    icon={c.icon}
                                    iconSize={24}
                                    tone="primary"
                                    size="md"
                                    className="shrink-0"
                                />
                                <div>
                                    <p className="text-[13px] font-bold tracking-[0.08em] text-faint uppercase">
                                        {c.label}
                                    </p>
                                    {c.href ? (
                                        <a
                                            href={c.href}
                                            className="mt-1 block text-[15.5px] font-semibold text-foreground hover:text-primary"
                                        >
                                            {c.value}
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-[15.5px] font-semibold text-foreground">
                                            {c.value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        <a
                            href={contact.whatsapp_url ?? `tel:${contact.phone}`}
                            target="_blank"
                            rel="noopener"
                            className="flex items-center gap-3.5 rounded-card brand-gradient-whatsapp p-[22px] shadow-[var(--shadow-md)]"
                        >
                            <MaterialSymbol
                                name="chat"
                                size={26}
                                fill
                                className="text-white"
                            />
                            <div className="flex-1">
                                <p className="text-[15.5px] font-extrabold text-white">
                                    Prefer WhatsApp?
                                </p>
                                <p className="text-[13px] text-white/85">
                                    Chat with a specialist right now.
                                </p>
                            </div>
                            <span className="rounded-control bg-white px-4 py-2.5 text-[13.5px] font-extrabold text-primary-deep">
                                Open chat
                            </span>
                        </a>
                    </div>

                    {/* Form column */}
                    <div
                        data-reveal
                        className="rounded-card border border-border bg-surface p-[clamp(24px,3.5vw,40px)] shadow-[var(--shadow-md)]"
                    >
                        <Form
                            action="/contact"
                            method="post"
                            resetOnSuccess
                            className="grid gap-4"
                        >
                            {({ processing, errors, wasSuccessful }) =>
                                wasSuccessful ? (
                                    <div className="py-[clamp(20px,4vw,48px)] text-center">
                                        <span className="mx-auto mb-5.5 flex size-[72px] items-center justify-center rounded-full brand-gradient-whatsapp text-white shadow-[0_16px_34px_-14px_rgba(234,88,12,0.6)]">
                                            <MaterialSymbol
                                                name="check"
                                                size={40}
                                                weight={500}
                                            />
                                        </span>
                                        <h2 className="font-serif text-[34px] font-semibold text-foreground">
                                            Message on its way!
                                        </h2>
                                        <p className="mx-auto mt-2 max-w-[380px] text-[15.5px] leading-[1.65] text-soft">
                                            Thanks for reaching out. A Travels
                                            Point specialist will be in touch
                                            within one business day. Your
                                            inquiry has been logged.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <h2 className="text-[22px] font-extrabold text-foreground">
                                                Send us a message
                                            </h2>
                                            <p className="mt-1 text-[14px] text-faint">
                                                Fields marked with care — we
                                                read every one.
                                            </p>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <label className="flex flex-col gap-1.5">
                                                <FieldLabel icon="person">
                                                    Full name
                                                </FieldLabel>
                                                <input
                                                    name="name"
                                                    required
                                                    placeholder="Jane Traveler"
                                                    className={fieldClass}
                                                />
                                                <FieldError
                                                    message={errors.name}
                                                />
                                            </label>
                                            <label className="flex flex-col gap-1.5">
                                                <FieldLabel icon="mail">
                                                    Email
                                                </FieldLabel>
                                                <input
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="jane@example.com"
                                                    className={fieldClass}
                                                />
                                                <FieldError
                                                    message={errors.email}
                                                />
                                            </label>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <label className="flex flex-col gap-1.5">
                                                <FieldLabel icon="call">
                                                    Phone
                                                </FieldLabel>
                                                <input
                                                    name="phone"
                                                    placeholder="+971 50 000 0000"
                                                    className={fieldClass}
                                                />
                                                <FieldError
                                                    message={errors.phone}
                                                />
                                            </label>
                                            <label className="flex flex-col gap-1.5">
                                                <FieldLabel icon="calendar_month">
                                                    Travel date
                                                </FieldLabel>
                                                <input
                                                    name="travel_date"
                                                    type="date"
                                                    className={fieldClass}
                                                />
                                                <FieldError
                                                    message={errors.travel_date}
                                                />
                                            </label>
                                        </div>

                                        <label className="flex flex-col gap-1.5">
                                            <FieldLabel icon="place">
                                                Destination
                                            </FieldLabel>
                                            <select
                                                name="destination"
                                                defaultValue={presetDestination}
                                                className={`${fieldClass} cursor-pointer`}
                                            >
                                                <option value="">
                                                    Choose a destination
                                                </option>
                                                {destinations.map((d) => (
                                                    <option key={d} value={d}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                            <FieldError
                                                message={errors.destination}
                                            />
                                        </label>

                                        <label className="flex flex-col gap-1.5">
                                            <FieldLabel icon="edit_note">
                                                Tell us about your trip
                                            </FieldLabel>
                                            <textarea
                                                name="message"
                                                required
                                                rows={4}
                                                placeholder="Who's travelling, what you love, rough budget…"
                                                className={`${fieldClass} resize-y leading-[1.6]`}
                                            />
                                            <FieldError
                                                message={errors.message}
                                            />
                                        </label>

                                        <CtaButton
                                            type="submit"
                                            disabled={processing}
                                            variant="primary"
                                            size="lg"
                                            block
                                            className="mt-2"
                                        >
                                            {processing ? (
                                                <span className="tp-spin size-[18px] rounded-full border-2 border-white/40 border-t-white" />
                                            ) : (
                                                <MaterialSymbol
                                                    name="send"
                                                    size={20}
                                                />
                                            )}
                                            Send message
                                        </CtaButton>

                                        <p className="flex items-center justify-center gap-1.5 text-[12.5px] text-faint">
                                            <MaterialSymbol
                                                name="verified_user"
                                                size={15}
                                                className="text-primary-deep"
                                            />
                                            Protected by spam filtering. We
                                            never share your details.
                                        </p>
                                    </>
                                )
                            }
                        </Form>
                    </div>
                </div>
            </Section>

            {/* ===== MAP ===== */}
            <Section
                bg="surface"
                spacing="none"
                className="pb-[clamp(56px,8vw,90px)]"
                containerClassName="max-w-[1180px]"
            >
                <div>
                    <div
                        data-reveal
                        className="mb-4.5 flex items-center gap-2.5"
                    >
                        <MaterialSymbol
                            name="map"
                            size={22}
                            className="text-primary-deep"
                        />
                        <h2 className="text-[20px] font-extrabold text-foreground">
                            Find us in Dubai Marina
                        </h2>
                    </div>
                    <div
                        data-reveal
                        className="relative h-[clamp(280px,38vw,420px)] overflow-hidden rounded-card border border-border shadow-[var(--shadow-md)]"
                    >
                        <iframe
                            title="Travels Point office — Dubai Marina"
                            src="https://www.google.com/maps?q=Dubai%20Marina&output=embed"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 size-full border-0"
                        />
                    </div>
                </div>
            </Section>
        </>
    );
}

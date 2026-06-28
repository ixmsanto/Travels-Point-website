import { Form, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import MaterialSymbol from '@/components/material-symbol';
import { CtaButton } from '@/components/public/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';

// How often the popup re-appears while browsing. The interval lives in the
// persistent PublicLayout, so it keeps ticking across Inertia page changes.
const INTERVAL_MS = 2 * 60 * 1000;

// Scroll distance (px) that counts as "the visitor started reading" before the
// first appearance, plus the short pause after that before the popup opens.
const FIRST_SCROLL_THRESHOLD = 300;
const FIRST_SHOW_DELAY_MS = 1200;

// Once a visitor has sent an inquiry we stop nagging them for the rest of the
// browsing session.
const SUBMITTED_KEY = 'tp_contact_popup_submitted';

const alreadySubmitted = () =>
    typeof sessionStorage !== 'undefined' &&
    sessionStorage.getItem(SUBMITTED_KEY) === '1';

const fieldClass =
    'w-full rounded-control border border-border-strong bg-surface-2 px-[14px] py-[11px] text-[15px] text-foreground outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_var(--ring-glow)] placeholder:text-faint';

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

/**
 * Recurring contact-form modal. Opens automatically every couple of minutes on
 * the public site to prompt visitors to get in touch. Reuses the `/contact`
 * inquiry endpoint and is fully responsive — it shrinks to the viewport and
 * scrolls internally on short screens. Mounted once in PublicLayout.
 */
export default function ContactPopup() {
    const page = usePage();
    const [open, setOpen] = useState(false);

    // Latest pathname, read inside the interval without re-arming the timer.
    const pathRef = useRef(new URL(page.url, 'http://x').pathname);

    useEffect(() => {
        pathRef.current = new URL(page.url, 'http://x').pathname;
    }, [page.url]);

    // Skip the prompt while the visitor is on the contact page or has already
    // sent us a message this session. `pathRef` is a stable ref, so neither
    // effect below needs to re-arm.
    const canShow = () =>
        pathRef.current !== '/contact' && !alreadySubmitted();

    // First appearance: once the visitor has scrolled into the page, open the
    // popup after a short pause — rather than making them wait a full interval.
    useEffect(() => {
        let timer = 0;

        const onScroll = () => {
            if (window.scrollY < FIRST_SCROLL_THRESHOLD) {
                return;
            }

            window.removeEventListener('scroll', onScroll);
            timer = window.setTimeout(() => {
                if (canShow()) {
                    setOpen(true);
                }
            }, FIRST_SHOW_DELAY_MS);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.clearTimeout(timer);
        };
    }, []);

    // Subsequent appearances: re-prompt every couple of minutes while browsing.
    useEffect(() => {
        const id = window.setInterval(() => {
            if (canShow()) {
                setOpen(true);
            }
        }, INTERVAL_MS);

        return () => window.clearInterval(id);
    }, []);

    const markSubmitted = () => {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(SUBMITTED_KEY, '1');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto p-0 sm:max-w-lg">
                {/* Brand header strip */}
                <div className="brand-gradient-whatsapp rounded-t-lg px-6 pt-6 pb-5 text-white">
                    <span className="flex size-11 items-center justify-center rounded-full bg-white/20">
                        <MaterialSymbol name="flight_takeoff" size={24} fill />
                    </span>
                    <DialogTitle className="mt-3.5 font-serif text-[clamp(22px,4vw,27px)] leading-tight font-semibold">
                        Planning a trip? Let&rsquo;s talk.
                    </DialogTitle>
                    <DialogDescription className="mt-1.5 text-[14px] leading-snug text-white/90">
                        Leave your details and a travel specialist will reach
                        out within one business day.
                    </DialogDescription>
                </div>

                <div className="p-[clamp(20px,4vw,28px)]">
                    <Form
                        action="/contact"
                        method="post"
                        resetOnSuccess
                        onSuccess={markSubmitted}
                        className="grid gap-3.5"
                    >
                        {({ processing, errors, wasSuccessful }) =>
                            wasSuccessful ? (
                                <div className="py-6 text-center">
                                    <span className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full brand-gradient-whatsapp text-white shadow-[0_16px_34px_-14px_rgba(234,88,12,0.6)]">
                                        <MaterialSymbol
                                            name="check"
                                            size={36}
                                            weight={500}
                                        />
                                    </span>
                                    <h2 className="font-serif text-[26px] font-semibold text-foreground">
                                        Message sent!
                                    </h2>
                                    <p className="mx-auto mt-2 max-w-[340px] text-[15px] leading-[1.6] text-soft">
                                        Thanks for reaching out — we&rsquo;ll be
                                        in touch very soon.
                                    </p>
                                    <CtaButton
                                        type="button"
                                        variant="outline"
                                        size="md"
                                        className="mt-5"
                                        onClick={() => setOpen(false)}
                                    >
                                        Close
                                    </CtaButton>
                                </div>
                            ) : (
                                <>
                                    <div className="grid gap-3.5 sm:grid-cols-2">
                                        <label className="flex flex-col gap-1.5">
                                            <input
                                                name="name"
                                                required
                                                placeholder="Full name"
                                                aria-label="Full name"
                                                className={fieldClass}
                                            />
                                            <FieldError message={errors.name} />
                                        </label>
                                        <label className="flex flex-col gap-1.5">
                                            <input
                                                name="phone"
                                                placeholder="Phone (optional)"
                                                aria-label="Phone"
                                                className={fieldClass}
                                            />
                                            <FieldError message={errors.phone} />
                                        </label>
                                    </div>

                                    <label className="flex flex-col gap-1.5">
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Email address"
                                            aria-label="Email address"
                                            className={fieldClass}
                                        />
                                        <FieldError message={errors.email} />
                                    </label>

                                    <label className="flex flex-col gap-1.5">
                                        <textarea
                                            name="message"
                                            required
                                            rows={3}
                                            placeholder="Where would you like to go?"
                                            aria-label="Message"
                                            className={`${fieldClass} resize-y leading-[1.6]`}
                                        />
                                        <FieldError message={errors.message} />
                                    </label>

                                    <CtaButton
                                        type="submit"
                                        disabled={processing}
                                        variant="primary"
                                        size="lg"
                                        block
                                        className="mt-1"
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

                                    <p className="flex items-center justify-center gap-1.5 text-[12px] text-faint">
                                        <MaterialSymbol
                                            name="verified_user"
                                            size={14}
                                            className="text-primary-deep"
                                        />
                                        We never share your details.
                                    </p>
                                </>
                            )
                        }
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

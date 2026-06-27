import { Link } from '@inertiajs/react';
import MaterialSymbol from '@/components/material-symbol';
import TravelLogo from '@/components/travel-logo';
import type { AuthLayoutProps } from '@/types';

export default function AuthTravelLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6 py-12">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        'radial-gradient(120% 90% at 80% 10%, rgba(11,78,162,0.12), transparent 55%)',
                }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(11,78,162,0.04)_0_2px,transparent_2px_22px)]" />

            <div className="relative w-full max-w-[430px]">
                <div className="rounded-[24px] border border-border bg-surface p-[clamp(28px,4vw,42px)] shadow-[var(--shadow-lg)]">
                    <Link
                        href="/"
                        className="flex items-center gap-3"
                        aria-label="Travels Point home"
                    >
                        <TravelLogo />
                    </Link>

                    <h1 className="mt-7 text-[25px] font-extrabold tracking-[-0.01em] text-foreground">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1.5 mb-6 text-[14.5px] text-faint">
                            {description}
                        </p>
                    )}

                    {children}
                </div>

                <Link
                    href="/"
                    className="mx-auto mt-5 flex w-fit items-center gap-1.5 text-[13.5px] font-semibold text-soft transition-colors hover:text-primary"
                >
                    <MaterialSymbol name="arrow_back" size={17} />
                    Back to website
                </Link>
            </div>
        </div>
    );
}

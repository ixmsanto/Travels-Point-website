import type { ReactNode } from 'react';

export default function PageHeader({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children?: ReactNode;
}) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3.5">
            <div>
                <h1 className="text-[24px] font-extrabold tracking-[-0.01em] text-foreground">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-[13.5px] text-faint">{description}</p>
                )}
            </div>
            {children && (
                <div className="flex flex-wrap items-center gap-2.5">
                    {children}
                </div>
            )}
        </div>
    );
}

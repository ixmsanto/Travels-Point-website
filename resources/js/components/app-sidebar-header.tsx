import { Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import ThemeToggle from '@/components/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-2">
                <Link
                    href="/"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    <ExternalLink className="size-4" />
                    <span className="hidden sm:inline">View site</span>
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}

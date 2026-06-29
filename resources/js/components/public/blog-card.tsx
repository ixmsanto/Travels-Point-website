import { Link } from '@inertiajs/react';
import MaterialSymbol from '@/components/material-symbol';
import { Chip } from '@/components/public/ui';
import type { BlogPost } from '@/types';

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

/**
 * Short date for blog cards, e.g. "20 Jun 2026". Parsed straight from the
 * YYYY-MM-DD prefix so the output is identical on the server and the client —
 * `toLocaleDateString` would format in the runtime's locale/timezone and break
 * SSR hydration.
 */
export function formatPostDate(value: string | null): string | null {
    if (!value) {
        return null;
    }

    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (!match) {
        return null;
    }

    const [, year, month, day] = match;

    return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

/** Card linking to a single blog post — used on the home page and /blog. */
export default function BlogCard({ post }: { post: BlogPost }) {
    const date = formatPostDate(post.published_at);

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-[var(--shadow-sm)] transition hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                {post.img ? (
                    <img
                        src={post.img}
                        alt=""
                        className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                ) : (
                    <div className="size-full brand-gradient" />
                )}
                <Chip tone="light" className="absolute top-3 left-3">
                    {post.category}
                </Chip>
            </div>
            <div className="flex flex-1 flex-col p-5.5">
                <div className="flex items-center gap-2 text-[12.5px] font-semibold text-faint">
                    {date && <span>{date}</span>}
                    {date && post.read_time && (
                        <span className="size-1 rounded-full bg-current" />
                    )}
                    {post.read_time && <span>{post.read_time}</span>}
                </div>
                <h3 className="mt-2 text-[19px] leading-[1.3] font-extrabold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[14.5px] leading-[1.6] text-soft">
                    {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-primary">
                    Read article
                    <MaterialSymbol
                        name="arrow_forward"
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </span>
            </div>
        </Link>
    );
}

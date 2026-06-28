import { Head, Link } from '@inertiajs/react';
import MaterialSymbol from '@/components/material-symbol';
import BlogCard, { formatPostDate } from '@/components/public/blog-card';
import { Section } from '@/components/public/section';
import { Chip } from '@/components/public/ui';
import type { BlogPost } from '@/types';

type Props = {
    post: BlogPost;
    related: BlogPost[];
};

export default function BlogShow({ post, related }: Props) {
    const date = formatPostDate(post.published_at);
    // Plain-text body → paragraphs split on blank lines.
    const paragraphs = post.body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <>
            <Head title={`${post.title} — Travels Point`} />

            <article>
                {/* ===== HEADER ===== */}
                <Section
                    bg="surface"
                    spacing="none"
                    width="narrow"
                    className="pt-[clamp(40px,6vw,72px)] pb-[clamp(20px,3vw,32px)]"
                >
                    <div data-reveal>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-1.5 text-[14px] font-bold text-soft transition-colors hover:text-primary"
                        >
                            <MaterialSymbol name="arrow_back" size={18} />
                            All stories
                        </Link>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Chip tone="primary">{post.category}</Chip>
                            <div className="flex items-center gap-2 text-[13px] font-semibold text-faint">
                                {date && <span>{date}</span>}
                                {date && post.read_time && (
                                    <span className="size-1 rounded-full bg-current" />
                                )}
                                {post.read_time && <span>{post.read_time}</span>}
                            </div>
                        </div>

                        <h1 className="mt-4 font-serif text-[clamp(32px,4.8vw,56px)] leading-[1.06] font-semibold tracking-tight text-foreground">
                            {post.title}
                        </h1>
                        <p className="mt-4 text-[clamp(16px,1.6vw,19px)] leading-[1.6] text-soft">
                            {post.excerpt}
                        </p>
                        <p className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-soft">
                            <MaterialSymbol
                                name="edit"
                                size={17}
                                className="text-primary-deep"
                            />
                            By {post.author}
                        </p>
                    </div>
                </Section>

                {/* ===== COVER ===== */}
                {post.img && (
                    <Section bg="surface" spacing="none" width="narrow">
                        <div
                            data-reveal
                            className="overflow-hidden rounded-panel shadow-[var(--shadow-md)]"
                        >
                            <img
                                src={post.img}
                                alt=""
                                className="aspect-[16/9] w-full object-cover"
                            />
                        </div>
                    </Section>
                )}

                {/* ===== BODY ===== */}
                <Section
                    bg="surface"
                    spacing="none"
                    width="narrow"
                    className="pt-[clamp(28px,4vw,48px)] pb-[clamp(56px,8vw,90px)]"
                >
                    <div
                        data-reveal
                        className="flex flex-col gap-5 text-[clamp(16px,1.6vw,18px)] leading-[1.8] text-foreground/90"
                    >
                        {paragraphs.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </Section>
            </article>

            {/* ===== RELATED ===== */}
            {related.length > 0 && (
                <Section bg="muted">
                    <h2 className="font-serif text-[clamp(26px,3.4vw,38px)] leading-[1.1] font-semibold tracking-tight text-foreground">
                        Keep reading
                    </h2>
                    <div
                        data-stagger
                        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {related.map((p) => (
                            <BlogCard key={p.id} post={p} />
                        ))}
                    </div>
                </Section>
            )}
        </>
    );
}

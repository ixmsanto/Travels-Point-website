import { Head } from '@inertiajs/react';
import BlogCard from '@/components/public/blog-card';
import { Section } from '@/components/public/section';
import { Eyebrow } from '@/components/public/section-heading';
import type { BlogPost } from '@/types';

type Props = { posts: BlogPost[] };

export default function Blog({ posts }: Props) {
    return (
        <>
            <Head title="Blog — Travels Point" />

            {/* ===== HEADER ===== */}
            <Section
                bg="surface"
                spacing="none"
                width="prose"
                className="pt-[clamp(48px,7vw,86px)] pb-[clamp(24px,3vw,36px)]"
            >
                <div data-reveal className="text-center">
                    <Eyebrow className="justify-center" icon="article">
                        From the blog
                    </Eyebrow>
                    <h1 className="mt-4 font-serif text-[clamp(38px,5.4vw,64px)] leading-[1.04] font-semibold tracking-tight text-foreground">
                        Travel stories &amp; guides
                    </h1>
                    <p className="mx-auto mt-4 max-w-[560px] text-[clamp(15px,1.5vw,18px)] leading-[1.7] text-soft">
                        Destination deep-dives, packing tips and inspiration from
                        the Travels Point team to help you plan the perfect trip.
                    </p>
                </div>
            </Section>

            {/* ===== GRID ===== */}
            <Section
                bg="surface"
                spacing="none"
                className="pt-[clamp(20px,3vw,40px)] pb-[clamp(56px,8vw,90px)]"
            >
                {posts.length > 0 ? (
                    <div
                        data-stagger
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-[16px] text-soft">
                        No stories published yet — check back soon.
                    </p>
                )}
            </Section>
        </>
    );
}

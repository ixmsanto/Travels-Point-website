import { Head, Link, useForm } from '@inertiajs/react';
import Field from '@/components/admin/field';
import ImageField from '@/components/admin/image-field';
import PageHeader from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { BlogPost } from '@/types';

type Props = { post: BlogPost | null };

export default function BlogForm({ post }: Props) {
    const editing = Boolean(post);
    const form = useForm({
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        category: post?.category ?? 'Travel',
        author: post?.author ?? 'Travels Point',
        read_time: post?.read_time ?? '',
        excerpt: post?.excerpt ?? '',
        body: post?.body ?? '',
        img: post?.img ?? '',
        image_file: null as File | null,
        published_at: post?.published_at ? post.published_at.slice(0, 10) : '',
        is_published: post?.is_published ?? true,
        sort_order: post?.sort_order ?? 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const url = editing ? `/admin/blog/${post!.id}` : '/admin/blog';

        form.transform((data) => {
            const payload: Record<string, unknown> = { ...data };

            if (!(payload.image_file instanceof File)) {
                delete payload.image_file;
            }

            if (editing) {
                payload._method = 'put';
            }

            return payload;
        });

        form.post(url);
    };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <Head title={editing ? 'Edit post' : 'New post'} />
            <PageHeader
                title={editing ? 'Edit blog post' : 'New blog post'}
                description="Travel stories shown on the home page and the blog."
            />

            <Card className="p-6">
                <form onSubmit={submit} className="grid gap-5">
                    <Field
                        label="Title"
                        htmlFor="title"
                        error={form.errors.title}
                    >
                        <Input
                            id="title"
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData('title', e.target.value)
                            }
                            placeholder="10 hidden gems in the Maldives"
                        />
                    </Field>

                    <Field
                        label="Slug"
                        htmlFor="slug"
                        error={form.errors.slug}
                        hint="Leave blank to auto-generate from the title."
                    >
                        <Input
                            id="slug"
                            value={form.data.slug}
                            onChange={(e) =>
                                form.setData('slug', e.target.value)
                            }
                            placeholder="hidden-gems-maldives"
                        />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Category"
                            htmlFor="category"
                            error={form.errors.category}
                        >
                            <Input
                                id="category"
                                value={form.data.category}
                                onChange={(e) =>
                                    form.setData('category', e.target.value)
                                }
                                placeholder="Destinations"
                            />
                        </Field>
                        <Field
                            label="Author"
                            htmlFor="author"
                            error={form.errors.author}
                        >
                            <Input
                                id="author"
                                value={form.data.author}
                                onChange={(e) =>
                                    form.setData('author', e.target.value)
                                }
                                placeholder="Travels Point"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Published date"
                            htmlFor="published_at"
                            error={form.errors.published_at}
                        >
                            <Input
                                id="published_at"
                                type="date"
                                value={form.data.published_at}
                                onChange={(e) =>
                                    form.setData('published_at', e.target.value)
                                }
                            />
                        </Field>
                        <Field
                            label="Read time"
                            htmlFor="read_time"
                            error={form.errors.read_time}
                            hint="Optional, e.g. “5 min read”."
                        >
                            <Input
                                id="read_time"
                                value={form.data.read_time}
                                onChange={(e) =>
                                    form.setData('read_time', e.target.value)
                                }
                                placeholder="5 min read"
                            />
                        </Field>
                    </div>

                    <ImageField
                        label="Cover image"
                        img={form.data.img ?? ''}
                        file={form.data.image_file}
                        aspect={16 / 9}
                        error={form.errors.img || form.errors.image_file}
                        onUrl={(url) => form.setData('img', url)}
                        onFile={(file) => form.setData('image_file', file)}
                    />

                    <Field
                        label="Excerpt"
                        htmlFor="excerpt"
                        error={form.errors.excerpt}
                        hint="Short teaser shown on cards and the home page."
                    >
                        <Textarea
                            id="excerpt"
                            rows={3}
                            value={form.data.excerpt}
                            onChange={(e) =>
                                form.setData('excerpt', e.target.value)
                            }
                            placeholder="A quick look at the quieter atolls worth the extra hop…"
                        />
                    </Field>

                    <Field
                        label="Body"
                        htmlFor="body"
                        error={form.errors.body}
                        hint="The full article. Separate paragraphs with a blank line."
                    >
                        <Textarea
                            id="body"
                            rows={12}
                            value={form.data.body}
                            onChange={(e) =>
                                form.setData('body', e.target.value)
                            }
                            placeholder={
                                'Write your story here.\n\nEach blank line starts a new paragraph.'
                            }
                        />
                    </Field>

                    <Field
                        label="Sort order"
                        htmlFor="sort_order"
                        error={form.errors.sort_order}
                    >
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={form.data.sort_order}
                            onChange={(e) =>
                                form.setData('sort_order', Number(e.target.value))
                            }
                        />
                    </Field>

                    <div className="flex items-center justify-between rounded-[12px] border border-border p-4">
                        <div>
                            <Label htmlFor="is_published">Published</Label>
                            <p className="text-[12.5px] text-faint">
                                Show this post on the public site.
                            </p>
                        </div>
                        <Switch
                            id="is_published"
                            checked={form.data.is_published}
                            onCheckedChange={(v) =>
                                form.setData('is_published', v)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 border-t border-border pt-5">
                        <Button asChild variant="outline">
                            <Link href="/admin/blog">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={form.processing}>
                            {editing ? 'Save changes' : 'Create post'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}

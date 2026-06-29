<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $posts = BlogPost::query()
            ->when($search, fn ($q) => $q->where('title', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%")
                ->orWhere('author', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->orderByDesc('published_at')
            ->get();

        return Inertia::render('admin/blog/index', [
            'posts' => $posts,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/blog/form', [
            'post' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        BlogPost::create($this->validated($request));

        return to_route('admin.blog.index')->with('success', 'Blog post created.');
    }

    public function edit(BlogPost $blog): Response
    {
        return Inertia::render('admin/blog/form', [
            'post' => $blog,
        ]);
    }

    public function update(Request $request, BlogPost $blog): RedirectResponse
    {
        $blog->update($this->validated($request, $blog));

        return to_route('admin.blog.index')->with('success', 'Blog post updated.');
    }

    public function destroy(BlogPost $blog): RedirectResponse
    {
        $this->deleteStoredImage($blog->img);
        $blog->delete();

        return back()->with('success', 'Blog post deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?BlogPost $blog = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'slug' => ['nullable', 'string', 'max:200'],
            'category' => ['required', 'string', 'max:60'],
            'author' => ['required', 'string', 'max:120'],
            'read_time' => ['nullable', 'string', 'max:30'],
            'excerpt' => ['required', 'string', 'max:400'],
            'body' => ['required', 'string', 'max:20000'],
            'img' => ['nullable', 'string', 'max:2048'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['slug'] = $this->uniqueSlug($data['slug'] ?: $data['title'], $blog?->id);
        $data['img'] = $this->resolveImage($request, 'blog', $blog?->img);
        unset($data['image_file']);

        return $data;
    }

    /**
     * Build a URL-safe, unique slug, appending -2, -3… on collision.
     */
    private function uniqueSlug(string $value, ?int $ignoreId): string
    {
        $base = Str::slug($value) ?: 'post';
        $slug = $base;
        $suffix = 2;

        while (BlogPost::where('slug', $slug)
            ->when($ignoreId, fn ($q) => $q->whereKeyNot($ignoreId))
            ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}

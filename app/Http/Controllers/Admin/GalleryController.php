<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $items = GalleryItem::query()
            ->when($search, fn ($q) => $q->where('topic', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/gallery/index', [
            'items' => $items,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/gallery/form', [
            'item' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        GalleryItem::create($this->validated($request));

        return to_route('admin.gallery.index')->with('success', 'Gallery item created.');
    }

    public function edit(GalleryItem $gallery): Response
    {
        return Inertia::render('admin/gallery/form', [
            'item' => $gallery,
        ]);
    }

    public function update(Request $request, GalleryItem $gallery): RedirectResponse
    {
        $gallery->update($this->validated($request, $gallery));

        return to_route('admin.gallery.index')->with('success', 'Gallery item updated.');
    }

    public function destroy(GalleryItem $gallery): RedirectResponse
    {
        $this->deleteStoredImage($gallery->img);
        $gallery->delete();

        return back()->with('success', 'Gallery item deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?GalleryItem $gallery = null): array
    {
        $data = $request->validate([
            'topic' => ['required', 'string', 'max:160'],
            'category' => ['required', 'string', 'max:60'],
            'tint0' => ['required', 'string', 'max:9'],
            'tint1' => ['required', 'string', 'max:9'],
            'img' => ['nullable', 'string', 'max:2048'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'is_published' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['img'] = $this->resolveImage($request, 'gallery', $gallery?->img);
        unset($data['image_file']);

        return $data;
    }
}

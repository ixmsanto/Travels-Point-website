<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BannerController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $banners = Banner::query()
            ->when($search, fn ($q) => $q->where('title', 'like', "%{$search}%")
                ->orWhere('subtitle', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/banners/index', [
            'banners' => $banners,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/banners/form', [
            'banner' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Banner::create($this->validated($request));

        return to_route('admin.banners.index')->with('success', 'Banner created.');
    }

    public function edit(Banner $banner): Response
    {
        return Inertia::render('admin/banners/form', [
            'banner' => $banner,
        ]);
    }

    public function update(Request $request, Banner $banner): RedirectResponse
    {
        $banner->update($this->validated($request, $banner));

        return to_route('admin.banners.index')->with('success', 'Banner updated.');
    }

    public function destroy(Banner $banner): RedirectResponse
    {
        $this->deleteStoredImage($banner->img);
        $banner->delete();

        return back()->with('success', 'Banner deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Banner $banner = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'subtitle' => ['required', 'string', 'max:200'],
            'placement' => ['required', Rule::in(['Hero', 'Strip'])],
            'active' => ['boolean'],
            'tint0' => ['required', 'string', 'max:9'],
            'tint1' => ['required', 'string', 'max:9'],
            'img' => ['nullable', 'string', 'max:2048'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['img'] = $this->resolveImage($request, 'banners', $banner?->img);
        unset($data['image_file']);

        return $data;
    }
}

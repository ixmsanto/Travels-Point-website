<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Models\TourPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TourPackageController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $packages = TourPackage::query()
            ->when($search, fn ($q) => $q->where('title', 'like', "%{$search}%")
                ->orWhere('location', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/packages/index', [
            'packages' => $packages,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/packages/form', [
            'package' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        TourPackage::create($this->validated($request));

        return to_route('admin.packages.index')->with('success', 'Tour package created.');
    }

    public function edit(TourPackage $package): Response
    {
        return Inertia::render('admin/packages/form', [
            'package' => $package,
        ]);
    }

    public function update(Request $request, TourPackage $package): RedirectResponse
    {
        $package->update($this->validated($request, $package));

        return to_route('admin.packages.index')->with('success', 'Tour package updated.');
    }

    public function destroy(TourPackage $package): RedirectResponse
    {
        $this->deleteStoredImage($package->img);
        $package->delete();

        return back()->with('success', 'Tour package deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?TourPackage $package = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'location' => ['required', 'string', 'max:120'],
            'region' => ['required', Rule::in(['India', 'International'])],
            'duration' => ['required', 'string', 'max:120'],
            'price' => ['required', 'integer', 'min:0'],
            'rating' => ['required', 'numeric', 'min:0', 'max:5'],
            'services' => ['required', 'array', 'min:1'],
            'services.*' => ['required', 'string', 'max:80'],
            'tint0' => ['required', 'string', 'max:9'],
            'tint1' => ['required', 'string', 'max:9'],
            'img' => ['nullable', 'string', 'max:2048'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['img'] = $this->resolveImage($request, 'packages', $package?->img);
        unset($data['image_file']);

        return $data;
    }
}

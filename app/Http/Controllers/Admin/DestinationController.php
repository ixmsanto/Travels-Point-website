<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $destinations = Destination::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('country', 'like', "%{$search}%")
                ->orWhere('tag', 'like', "%{$search}%"))
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/destinations/index', [
            'destinations' => $destinations,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/destinations/form', [
            'destination' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Destination::create($this->validated($request));

        return to_route('admin.destinations.index')->with('success', 'Destination created.');
    }

    public function edit(Destination $destination): Response
    {
        return Inertia::render('admin/destinations/form', [
            'destination' => $destination,
        ]);
    }

    public function update(Request $request, Destination $destination): RedirectResponse
    {
        $destination->update($this->validated($request, $destination));

        return to_route('admin.destinations.index')->with('success', 'Destination updated.');
    }

    public function destroy(Destination $destination): RedirectResponse
    {
        $this->deleteStoredImage($destination->img);
        $destination->delete();

        return back()->with('success', 'Destination deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Destination $destination = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'country' => ['required', 'string', 'max:120'],
            'price' => ['required', 'integer', 'min:0'],
            'tag' => ['required', 'string', 'max:60'],
            'blurb' => ['required', 'string', 'max:500'],
            'tint0' => ['required', 'string', 'max:9'],
            'tint1' => ['required', 'string', 'max:9'],
            'img' => ['nullable', 'string', 'max:2048'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'is_featured' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['img'] = $this->resolveImage($request, 'destinations', $destination?->img);
        unset($data['image_file']);

        return $data;
    }
}

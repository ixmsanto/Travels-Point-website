<?php

namespace App\Http\Controllers\Admin;

use App\Concerns\HandlesImageUploads;
use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    use HandlesImageUploads;

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $offers = Offer::query()
            ->when($search, fn ($q) => $q->where('title', 'like', "%{$search}%"))
            ->when($status && $status !== 'All', fn ($q) => $q->where('status', $status))
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('admin/offers/index', [
            'offers' => $offers,
            'filters' => ['search' => $search, 'status' => $status ?: 'All'],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/offers/form', [
            'offer' => null,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Offer::create($this->validated($request));

        return to_route('admin.offers.index')->with('success', 'Offer created.');
    }

    public function edit(Offer $offer): Response
    {
        return Inertia::render('admin/offers/form', [
            'offer' => $offer,
        ]);
    }

    public function update(Request $request, Offer $offer): RedirectResponse
    {
        $offer->update($this->validated($request, $offer));

        return to_route('admin.offers.index')->with('success', 'Offer updated.');
    }

    public function destroy(Offer $offer): RedirectResponse
    {
        $this->deleteStoredImage($offer->img);
        $offer->delete();

        return back()->with('success', 'Offer deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Offer $offer = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:160'],
            'discount' => ['required', 'integer', 'min:0', 'max:100'],
            'description' => ['required', 'string', 'max:500'],
            'cta' => ['required', 'string', 'max:60'],
            'cta_url' => ['required', 'string', 'max:2048'],
            'status' => ['required', Rule::in(['Active', 'Scheduled', 'Expired'])],
            'featured' => ['boolean'],
            'tint0' => ['required', 'string', 'max:9'],
            'tint1' => ['required', 'string', 'max:9'],
            'img' => ['nullable', 'string', 'max:2048'],
            'image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['img'] = $this->resolveImage($request, 'offers', $offer?->img);
        unset($data['image_file']);

        return $data;
    }
}

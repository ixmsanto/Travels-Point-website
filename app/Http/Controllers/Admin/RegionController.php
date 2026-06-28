<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Region;
use App\Models\TourPackage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RegionController extends Controller
{
    public function index(): Response
    {
        $regions = Region::query()
            ->withCount('packages')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/regions/index', [
            'regions' => $regions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Region::create($this->validated($request));

        return back()->with('success', 'Region created.');
    }

    public function update(Request $request, Region $region): RedirectResponse
    {
        $data = $this->validated($request, $region);

        // Keep packages in sync when a region is renamed (they reference it by name).
        if ($region->name !== $data['name']) {
            TourPackage::where('region', $region->name)->update(['region' => $data['name']]);
        }

        $region->update($data);

        return back()->with('success', 'Region updated.');
    }

    public function destroy(Region $region): RedirectResponse
    {
        if ($region->packages()->exists()) {
            return back()->with('error', "Can’t delete “{$region->name}” — packages are still using it. Reassign them first.");
        }

        $region->delete();

        return back()->with('success', 'Region deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, ?Region $region = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:60', Rule::unique('regions', 'name')->ignore($region?->id)],
            'icon' => ['nullable', 'string', 'max:60'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}

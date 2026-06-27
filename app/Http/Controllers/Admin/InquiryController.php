<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $status = $request->string('status')->toString();

        $inquiries = Inquiry::query()
            ->when($search, fn ($q) => $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('destination', 'like', "%{$search}%"))
            ->when($status && $status !== 'All', fn ($q) => $q->where('status', $status))
            ->latest()
            ->get();

        return Inertia::render('admin/inquiries/index', [
            'inquiries' => $inquiries,
            'filters' => ['search' => $search, 'status' => $status ?: 'All'],
        ]);
    }

    public function update(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['New', 'Replied', 'Closed'])],
        ]);

        $inquiry->update($validated);

        return back()->with('success', 'Inquiry status updated.');
    }

    public function destroy(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return back()->with('success', 'Inquiry deleted.');
    }
}

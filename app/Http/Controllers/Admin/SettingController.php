<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function edit(): Response
    {
        $settings = SiteSetting::map();

        // Expose the per-link flags as real booleans for the toggle switches.
        foreach (SiteSetting::SOCIAL_PLATFORMS as $platform) {
            $key = "{$platform}_active";
            $settings[$key] = ($settings[$key] ?? '1') !== '0';
        }

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'phone' => ['nullable', 'string', 'max:60'],
            'whatsapp' => ['nullable', 'string', 'max:60'],
            'email' => ['nullable', 'email', 'max:160'],
            'address' => ['nullable', 'string', 'max:255'],
            'facebook' => ['nullable', 'url', 'max:255'],
            'instagram' => ['nullable', 'url', 'max:255'],
            'youtube' => ['nullable', 'url', 'max:255'],
            'twitter' => ['nullable', 'url', 'max:255'],
            'linkedin' => ['nullable', 'url', 'max:255'],
            'tiktok' => ['nullable', 'url', 'max:255'],
            'facebook_active' => ['boolean'],
            'instagram_active' => ['boolean'],
            'youtube_active' => ['boolean'],
            'twitter_active' => ['boolean'],
            'linkedin_active' => ['boolean'],
            'tiktok_active' => ['boolean'],
        ]);

        // Store the on/off flags as '1'/'0' strings.
        foreach (SiteSetting::SOCIAL_PLATFORMS as $platform) {
            $validated["{$platform}_active"] = $request->boolean("{$platform}_active") ? '1' : '0';
        }

        SiteSetting::putMany($validated);

        return back()->with('success', 'Settings saved.');
    }
}

<?php

namespace App\Concerns;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Shared image handling for admin media controllers.
 *
 * A record's `img` column may hold either an external URL or a path to a file
 * uploaded to the public disk (served from `/storage/...`). The admin form can
 * send a cropped file under `image_file`; when present it wins and the previous
 * uploaded file is cleaned up. Otherwise the submitted `img` URL is kept.
 */
trait HandlesImageUploads
{
    /**
     * Resolve the `img` value to persist from the request.
     */
    protected function resolveImage(Request $request, string $directory, ?string $existing = null): ?string
    {
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store($directory, 'public');

            if ($path === false) {
                return $existing; // store failed — keep the current image
            }

            $this->deleteStoredImage($existing);

            return Storage::disk('public')->url($path);
        }

        // No new upload — keep the submitted URL, or the existing value if absent.
        $img = $request->input('img', $existing);

        return $img !== null && $img !== '' ? $img : null;
    }

    /**
     * Delete a previously uploaded file living on the public disk. External
     * URLs (anything not under `/storage/`) are left untouched.
     */
    protected function deleteStoredImage(?string $url): void
    {
        if (! $url) {
            return;
        }

        $marker = '/storage/';
        $pos = strpos($url, $marker);

        if ($pos === false) {
            return;
        }

        $path = substr($url, $pos + strlen($marker));

        Storage::disk('public')->delete($path);
    }
}

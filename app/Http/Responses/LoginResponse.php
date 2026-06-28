<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

/**
 * Sends admins to the console after login and keeps regular users on the public
 * site, so a normal account never lands in (or gets bounced out of) /admin.
 */
class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse|JsonResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        if (! $request->user()?->is_admin) {
            return redirect('/');
        }

        return redirect()->intended(config('fortify.home', '/admin'));
    }
}

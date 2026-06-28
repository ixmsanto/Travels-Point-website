<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

/**
 * New sign-ups are always regular (non-admin) users, so send them to the public
 * site rather than the admin console.
 */
class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request): RedirectResponse|JsonResponse
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 201);
        }

        return redirect('/');
    }
}

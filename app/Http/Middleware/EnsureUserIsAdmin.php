<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Restricts the admin console to users flagged as admins. Non-admins (regular
 * registered users) are sent back to the public site instead of the console.
 */
class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->is_admin) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}

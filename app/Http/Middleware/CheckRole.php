<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        // Cek apakah user sudah login dan apakah rolenya sesuai
        if (!$request->user() || $request->user()->role !== $role) {
            return response()->json([
                'message' => 'Forbidden: Anda tidak memiliki akses untuk halaman ini.'
            ], 403);
        }

        return $next($request);
    }
}

<?php

use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- Public Routes ---
Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
});

// --- Protected Routes ---
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {

    // 1. Universal 
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Logout
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // 2. Admin
    Route::middleware('role:admin')->group(function () {
        
    });
    
    // 3. Customer Service (CS)
    Route::middleware('role:cs')->group(function () {
       
    });

    // 4. Mechanic
    Route::middleware('role:mechanic')->group(function () {
       
    });

    // 5. Khusus Customer
    Route::middleware('role:customer')->group(function () {
        
    });
});
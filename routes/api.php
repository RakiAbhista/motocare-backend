<?php

use App\Http\Controllers\Api\V1\Admin\AdminDashboardController;
use App\Http\Controllers\Api\V1\Admin\UserController;
use App\Http\Controllers\Api\V1\Admin\WorkshopController;
use App\Http\Controllers\Api\V1\Admin\ServiceController;
use App\Http\Controllers\Api\V1\Admin\VehicleController;
use App\Http\Controllers\Api\V1\Admin\OrderController;
use App\Http\Controllers\Api\V1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// --- Public Routes ---
Route::prefix('v1')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
    Route::post('/auth/verify-otp', [AuthController::class, 'verifyOtp'])->name('otp.verify');
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
        Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);
        
        // Users Management
        Route::get('/admin/users', [UserController::class, 'index']);
        Route::post('/admin/users', [UserController::class, 'store']);
        Route::put('/admin/users/{id}', [UserController::class, 'update']);
        Route::delete('/admin/users/{id}', [UserController::class, 'destroy']);
        
        // Workshops Management
        Route::get('/admin/workshops', [WorkshopController::class, 'index']);
        Route::post('/admin/workshops', [WorkshopController::class, 'store']);
        Route::put('/admin/workshops/{id}', [WorkshopController::class, 'update']);
        Route::delete('/admin/workshops/{id}', [WorkshopController::class, 'destroy']);
        
        // Services Management
        Route::get('/admin/services', [ServiceController::class, 'index']);
        Route::post('/admin/services', [ServiceController::class, 'store']);
        Route::put('/admin/services/{id}', [ServiceController::class, 'update']);
        Route::delete('/admin/services/{id}', [ServiceController::class, 'destroy']);
        
        // Vehicles Management
        Route::get('/admin/vehicles', [VehicleController::class, 'index']);
        Route::get('/admin/vehicles/{id}', [VehicleController::class, 'show']);
        
        // Orders Management
        Route::get('/admin/orders', [OrderController::class, 'index']);
        Route::get('/admin/orders/{id}', [OrderController::class, 'show']);
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
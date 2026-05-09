<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Auth Routes (Guest Only)
Route::middleware('guest')->group(function () {
    Route::get('auth/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('auth/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::get('auth/forgot-password', function () {
        return Inertia::render('Auth/ForgotPassword');
    })->name('forgot-password');

    Route::get('auth/reset-password', function () {
        return Inertia::render('Auth/ResetPassword');
    })->name('reset-password');
});

// Admin Routes
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    Route::get('/accounts', function () {
        return Inertia::render('Admin/Accounts');
    })->name('admin.accounts');

    Route::get('/workshops', function () {
        return Inertia::render('Admin/Workshops');
    })->name('admin.workshops');

    Route::get('/services', function () {
        return Inertia::render('Admin/Services');
    })->name('admin.services');

    Route::get('/vehicles', function () {
        return Inertia::render('Admin/Vehicles');
    })->name('admin.vehicles');

    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders');
    })->name('admin.orders');
});

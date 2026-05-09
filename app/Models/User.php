<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * Model User untuk Aplikasi Motocare.
 * Menggunakan Laravel 13 style dengan Attributes untuk fillable dan hidden.
 */
#[Fillable(['name', 'email', 'password', 'role', 'phone_number', 'points'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Casting atribut.
     * Di Laravel 13, password otomatis di-hash jika menggunakan cast 'hashed'.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Helper untuk mengecek role user di dalam code.
     * Contoh penggunaan: if($user->isAdmin()) { ... }
     */
    protected $appends = ['phone'];

    public function getPhoneAttribute(): string
    {
        return $this->phone_number ?? '';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isMechanic(): bool
    {
        return $this->role === 'mechanic';
    }

    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }

    public function isCS(): bool
    {
        return $this->role === 'cs';
    }
}
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'customer_service', 'mechanic', 'customer'];

        foreach ($roles as $role) {
            User::create([
                'name' => 'Akun ' . strtoupper($role),
                'email' => $role . '@motocare.com',
                'password' => Hash::make($role . '123'), // Password: admin123, mechanic123, dll
                'role' => $role,
            ]);
        }
    }
}

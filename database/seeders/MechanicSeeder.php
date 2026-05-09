<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Mechanic;

class MechanicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User dengan ID 3 (Ahmad Hidayat - mechanic)
        Mechanic::create([
            'user_id' => 3,
            'status' => 'available',
        ]);

        // User dengan ID 4 (Roni Pratama - mechanic)
        Mechanic::create([
            'user_id' => 4,
            'status' => 'available',
        ]);
    }
}

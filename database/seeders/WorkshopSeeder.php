<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Workshop;

class WorkshopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Workshop::create([
            'name' => 'Workshop Jakarta Pusat',
            'latitude' => -6.1944,
            'longitude' => 106.8296,
        ]);

        Workshop::create([
            'name' => 'Workshop Jakarta Selatan',
            'latitude' => -6.2749,
            'longitude' => 106.7925,
        ]);

        Workshop::create([
            'name' => 'Workshop Bandung',
            'latitude' => -6.9175,
            'longitude' => 107.6191,
        ]);

        Workshop::create([
            'name' => 'Workshop Surabaya',
            'latitude' => -7.2505,
            'longitude' => 112.7508,
        ]);

        Workshop::create([
            'name' => 'Workshop Medan',
            'latitude' => 3.5952,
            'longitude' => 98.6722,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create([
            'service_name' => 'Ganti Oli',
            'base_price' => 50000,
        ]);

        Service::create([
            'service_name' => 'Servis Rutin',
            'base_price' => 150000,
        ]);

        Service::create([
            'service_name' => 'Ganti Kampas Rem',
            'base_price' => 120000,
        ]);

        Service::create([
            'service_name' => 'Ganti Ban',
            'base_price' => 300000,
        ]);

        Service::create([
            'service_name' => 'Perbaikan Mesin',
            'base_price' => 500000,
        ]);

        Service::create([
            'service_name' => 'Ganti Aki',
            'base_price' => 200000,
        ]);

        Service::create([
            'service_name' => 'Cuci Motor',
            'base_price' => 30000,
        ]);
    }
}

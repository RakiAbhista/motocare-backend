<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Vehicle::create([
            'vehicle_type' => 'Motor',
            'brand' => 'Honda',
            'model' => 'CB150R',
            'plate_number' => 'B 1234 ABC',
            'manufacturing_year' => 2022,
            'registration_doc' => 'doc_001.pdf',
        ]);

        Vehicle::create([
            'vehicle_type' => 'Motor',
            'brand' => 'Yamaha',
            'model' => 'NMAX 155',
            'plate_number' => 'B 5678 DEF',
            'manufacturing_year' => 2023,
            'registration_doc' => 'doc_002.pdf',
        ]);

        Vehicle::create([
            'vehicle_type' => 'Motor',
            'brand' => 'Suzuki',
            'model' => 'GSX-R150',
            'plate_number' => 'B 9012 GHI',
            'manufacturing_year' => 2021,
            'registration_doc' => 'doc_003.pdf',
        ]);

        Vehicle::create([
            'vehicle_type' => 'Motor',
            'brand' => 'Kawasaki',
            'model' => 'Ninja 250',
            'plate_number' => 'B 3456 JKL',
            'manufacturing_year' => 2020,
            'registration_doc' => 'doc_004.pdf',
        ]);
    }
}

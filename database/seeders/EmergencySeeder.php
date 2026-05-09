<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Emergency;

class EmergencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Emergency::create([
            'user_id' => 1,
            'mechanic_id' => 1,
            'vehicle_id' => 1,
            'vehicle_model' => 'CB150R',
            'vehicle_brand' => 'Honda',
            'vehicle_type' => 'Motor',
            'plate_number' => 'B 1234 ABC',
            'workshop_id' => 1,
            'latitude' => -6.2088,
            'longitude' => 106.8456,
            'damage_photo' => null,
            'status' => 'completed',
            'requested_at' => now()->subDays(2),
        ]);

        Emergency::create([
            'user_id' => 2,
            'mechanic_id' => 2,
            'vehicle_id' => 2,
            'vehicle_model' => 'NMAX 155',
            'vehicle_brand' => 'Yamaha',
            'vehicle_type' => 'Motor',
            'plate_number' => 'B 5678 DEF',
            'workshop_id' => 2,
            'latitude' => -6.2806,
            'longitude' => 106.7988,
            'damage_photo' => 'emergency_001.jpg',
            'status' => 'waiting_payment',
            'requested_at' => now()->subHours(8),
        ]);

        Emergency::create([
            'user_id' => 1,
            'mechanic_id' => null,
            'vehicle_id' => null,
            'vehicle_model' => 'GSX-R150',
            'vehicle_brand' => 'Suzuki',
            'vehicle_type' => 'Motor',
            'plate_number' => 'B 9012 GHI',
            'workshop_id' => null,
            'latitude' => -6.1753,
            'longitude' => 106.8249,
            'damage_photo' => null,
            'status' => 'pending',
            'requested_at' => now(),
        ]);
    }
}

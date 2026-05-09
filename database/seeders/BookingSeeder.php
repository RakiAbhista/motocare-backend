<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Booking;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Booking::create([
            'user_id' => 1,
            'vehicle_id' => 1,
            'workshop_id' => 1,
            'service_id' => 1,
            'complaint' => 'Oli motor sudah tua, perlu diganti',
            'damage_photo' => null,
            'booking_date' => now()->addDays(3),
        ]);

        Booking::create([
            'user_id' => 2,
            'vehicle_id' => 2,
            'workshop_id' => 2,
            'service_id' => 3,
            'complaint' => 'Kampas rem sudah tipis dan bunyi saat direm',
            'damage_photo' => 'damage_001.jpg',
            'booking_date' => now()->addDays(5),
        ]);

        Booking::create([
            'user_id' => 1,
            'vehicle_id' => 3,
            'workshop_id' => 3,
            'service_id' => 2,
            'complaint' => 'Servis rutin berkala',
            'damage_photo' => null,
            'booking_date' => now()->addDays(7),
        ]);
    }
}

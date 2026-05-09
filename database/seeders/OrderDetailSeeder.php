<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OrderDetail;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Order 1 details - menggunakan Booking (Order ID: 1)
        OrderDetail::create([
            'order_id' => 1,
            'order_type' => 'booking',
            'reference_id' => 1, // Booking ID 1
            'price' => 50000,
        ]);

        OrderDetail::create([
            'order_id' => 1,
            'order_type' => 'booking',
            'reference_id' => 1, // Booking ID 1
            'price' => 120000,
        ]);

        // Order 2 details - menggunakan Booking (Order ID: 2)
        OrderDetail::create([
            'order_id' => 2,
            'order_type' => 'booking',
            'reference_id' => 2, // Booking ID 2
            'price' => 120000,
        ]);

        // Order 3 details - menggunakan Emergency (Order ID: 3)
        OrderDetail::create([
            'order_id' => 3,
            'order_type' => 'emergency',
            'reference_id' => 1, // Emergency ID 1
            'price' => 500000,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Order::create([
            'mechanic_id' => 1,
            'voucher_id' => 1,
            'total_price' => 135000,
            'status' => 'completed',
            'payment_status' => 'paid',
            'payment_type' => 'transfer',
            'transaction_id' => 'TRX001',
            'payment_url' => null,
            'scheduled_at' => now()->addDays(2),
        ]);

        Order::create([
            'mechanic_id' => 2,
            'voucher_id' => null,
            'total_price' => 120000,
            'status' => 'in_progress',
            'payment_status' => 'pending',
            'payment_type' => 'gopay',
            'transaction_id' => null,
            'payment_url' => 'https://payment.url/order2',
            'scheduled_at' => now()->addDays(1),
        ]);

        Order::create([
            'mechanic_id' => 1,
            'voucher_id' => 2,
            'total_price' => 450000,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_type' => 'card',
            'transaction_id' => null,
            'payment_url' => 'https://payment.url/order3',
            'scheduled_at' => now()->addDays(5),
        ]);
    }
}

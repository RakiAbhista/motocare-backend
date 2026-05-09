<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voucher;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Voucher::create([
            'code' => 'DISKON10',
            'discount_value' => 10,
            'discount_type' => 'percentage',
            'min_spend' => 100000,
            'expiry_date' => now()->addMonths(3),
            'usage_limit' => 50,
        ]);

        Voucher::create([
            'code' => 'DISKON50K',
            'discount_value' => 50000,
            'discount_type' => 'fixed',
            'min_spend' => 500000,
            'expiry_date' => now()->addMonths(2),
            'usage_limit' => 20,
        ]);

        Voucher::create([
            'code' => 'PROMO15',
            'discount_value' => 15,
            'discount_type' => 'percentage',
            'min_spend' => 250000,
            'expiry_date' => now()->addMonths(1),
            'usage_limit' => 100,
        ]);

        Voucher::create([
            'code' => 'GRATISONGKIR',
            'discount_value' => 30000,
            'discount_type' => 'fixed',
            'min_spend' => 150000,
            'expiry_date' => now()->addMonths(6),
            'usage_limit' => 200,
        ]);
    }
}

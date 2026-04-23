<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('mechanic_id')->constrained('mechanics');
            $table->foreignId('voucher_id')->nullable()->constrained('vouchers');
            $table->decimal('total_price', 15, 2);
            $table->enum('status', ['pending', 'in_progress', 'waiting_payment', 'completed', 'cancelled'])->default('pending'); 
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');
            $table->string('payment_type')->nullable();
            $table->string('transaction_id')->nullable();
            $table->string('payment_url')->nullable();
            $table->dateTime('scheduled_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

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
        Schema::create('emergencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('mechanic_id')->nullable()->constrained('mechanics');
            $table->foreignId('vehicle_id')->nullable()->constrained('vehicles');
            $table->string('vehicle_model')->nullable();
            $table->string('vehicle_brand')->nullable();
            $table->string('vehicle_type')->nullable();
            $table->string('plate_number')->nullable();
            $table->foreignId('workshop_id')->nullable()->constrained('workshops');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->string('damage_photo')->nullable();
            $table->enum('status', ['pending', 'dispatched', 'waiting_payment', 'completed'])->default('pending');
            $table->timestamp('requested_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emergencies');
    }
};

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_type',
        'brand',
        'model',
        'plate_number',
        'manufacturing_year',
        'registration_doc',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function emergencies(): HasMany
    {
        return $this->hasMany(Emergency::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'order_type',
        'reference_id',
        'price',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Get the referrable model (Booking atau Emergency)
     */
    public function reference()
    {
        if ($this->order_type === 'booking') {
            return $this->belongsTo(Booking::class, 'reference_id');
        } elseif ($this->order_type === 'emergency') {
            return $this->belongsTo(Emergency::class, 'reference_id');
        }
        return null;
    }
}

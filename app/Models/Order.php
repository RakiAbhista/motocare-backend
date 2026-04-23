<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'mechanic_id',
        'voucher_id',
        'total_price',
        'status',
        'payment_status',
        'payment_type',
        'transaction_id',
        'payment_url',
        'scheduled_at',
    ];

    protected $casts = [
        'total_price' => 'decimal:2',
        'scheduled_at' => 'datetime',
    ];

    public function mechanic(): BelongsTo
    {
        return $this->belongsTo(Mechanic::class);
    }

    public function voucher(): BelongsTo
    {
        return $this->belongsTo(Voucher::class);
    }

    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }
}

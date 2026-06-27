<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    /** @use HasFactory<\Database\Factories\OfferFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'discount',
        'description',
        'expiry',
        'cta',
        'cta_url',
        'status',
        'featured',
        'tint0',
        'tint1',
        'img',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'discount' => 'integer',
            'expiry' => 'date',
            'featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

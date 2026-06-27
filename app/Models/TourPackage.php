<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    /** @use HasFactory<\Database\Factories\TourPackageFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'location',
        'region',
        'duration',
        'price',
        'rating',
        'services',
        'tint0',
        'tint1',
        'img',
        'is_featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'rating' => 'float',
            'services' => 'array',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

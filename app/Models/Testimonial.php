<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{


    protected $fillable = [
        'name',
        'location',
        'rating',
        'review',
        'tint0',
        'tint1',
        'img',
        'is_published',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_published' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{


    protected $fillable = [
        'name',
        'country',
        'price',
        'tag',
        'blurb',
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
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

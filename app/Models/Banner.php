<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{


    protected $fillable = [
        'title',
        'subtitle',
        'placement',
        'active',
        'tint0',
        'tint1',
        'img',
        'video',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}

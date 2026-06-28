<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    protected $fillable = [
        'name',
        'icon',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    /**
     * Packages are linked to a region by its name (kept in sync on rename).
     *
     * @return HasMany<TourPackage, $this>
     */
    public function packages(): HasMany
    {
        return $this->hasMany(TourPackage::class, 'region', 'name');
    }
}

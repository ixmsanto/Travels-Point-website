<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    /** @use HasFactory<\Database\Factories\InquiryFactory> */
    use HasFactory;

    protected $table = 'inquiries';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'destination',
        'travel_date',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'travel_date' => 'date',
        ];
    }
}

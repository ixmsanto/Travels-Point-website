<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin account for the Travels Point console.
        User::updateOrCreate(
            ['email' => 'admin@travelspoint.com'],
            [
                'name' => 'Elena Marsh',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $this->call(TravelsPointSeeder::class);
    }
}

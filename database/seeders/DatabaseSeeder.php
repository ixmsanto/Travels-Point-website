<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Creates (or updates) the single admin account from config/admin.php,
     * whose values come from the ADMIN_* keys in .env so the real password is
     * never committed. No sample data is seeded — content is added through the
     * admin console.
     */
    public function run(): void
    {
        $email = config('admin.email');
        $password = config('admin.password');

        if (! $email || ! $password) {
            $this->command?->warn(
                'Admin not seeded — set ADMIN_EMAIL and ADMIN_PASSWORD in your .env file.'
            );

            return;
        }

        // is_admin is intentionally not mass-assignable, so set it directly.
        $admin = User::firstOrNew(['email' => $email]);
        $admin->name = config('admin.name', 'Administrator');
        $admin->password = Hash::make($password);
        $admin->email_verified_at = now();
        $admin->is_admin = true;
        $admin->save();

        $this->command?->info("Admin account ready: {$email}");
    }
}

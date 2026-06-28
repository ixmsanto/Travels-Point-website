<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Console admin account
    |--------------------------------------------------------------------------
    |
    | The single administrator created by DatabaseSeeder. The password is read
    | from .env (ADMIN_PASSWORD) so the real secret is never committed to
    | version control. Leave ADMIN_PASSWORD unset to skip seeding the admin.
    |
    */

    'name' => env('ADMIN_NAME', 'Administrator'),

    'email' => env('ADMIN_EMAIL', 'admin@gmail.com'),

    'password' => env('ADMIN_PASSWORD'),
];

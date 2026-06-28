<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('icon')->nullable(); // optional Material Symbol name for the filter tab
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        // Seed the two regions the site shipped with so existing packages keep working.
        DB::table('regions')->insert([
            ['name' => 'India', 'icon' => 'place', 'sort_order' => 0, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'International', 'icon' => 'public', 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('regions');
    }
};

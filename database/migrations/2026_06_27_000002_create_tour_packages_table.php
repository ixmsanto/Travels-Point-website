<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tour_packages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('location');
            $table->string('duration');
            $table->unsignedInteger('price');
            $table->decimal('rating', 2, 1)->default(5.0);
            $table->json('services');
            $table->string('tint0')->default('#1769a8');
            $table->string('tint1')->default('#7cc4ea');
            $table->string('img')->nullable();
            $table->boolean('is_featured')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tour_packages');
    }
};

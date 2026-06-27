<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedInteger('discount');
            $table->text('description');
            $table->date('expiry');
            $table->string('cta')->default('Book Now');
            $table->string('cta_url')->default('#');
            $table->string('status')->default('Active'); // Active | Scheduled | Expired
            $table->boolean('featured')->default(false);
            $table->string('tint0')->default('#1769a8');
            $table->string('tint1')->default('#7cc4ea');
            $table->string('img')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};

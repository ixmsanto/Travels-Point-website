<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            // Optional background video for Hero slides. When set, the slide
            // plays this clip and `img` (if any) is used as the poster frame.
            $table->string('video')->nullable()->after('img');
        });
    }

    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $table->dropColumn('video');
        });
    }
};

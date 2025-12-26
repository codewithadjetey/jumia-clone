<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dateTime('flash_sale_start')->nullable()->after('featured');
            $table->dateTime('flash_sale_end')->nullable()->after('flash_sale_start');
            $table->decimal('flash_sale_price', 10, 2)->nullable()->after('flash_sale_end');
            $table->decimal('average_rating', 3, 2)->nullable()->default(0)->after('flash_sale_price');
            $table->integer('review_count')->default(0)->after('average_rating');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['flash_sale_start', 'flash_sale_end', 'flash_sale_price', 'average_rating', 'review_count']);
        });
    }
};





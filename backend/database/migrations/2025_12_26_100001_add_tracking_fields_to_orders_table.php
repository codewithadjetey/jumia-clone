<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('tracking_number')->nullable()->unique()->after('order_number');
            $table->string('delivery_slot')->nullable()->after('billing_address_id');
            $table->text('order_notes')->nullable()->after('delivery_slot');
            $table->date('estimated_delivery')->nullable()->after('order_notes');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['tracking_number', 'delivery_slot', 'order_notes', 'estimated_delivery']);
        });
    }
};





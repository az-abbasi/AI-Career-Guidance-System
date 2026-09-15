<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('academic_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('gpa', 3, 2);
            $table->integer('semester');
            $table->json('subjects')->nullable();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('academic_records');
    }
};
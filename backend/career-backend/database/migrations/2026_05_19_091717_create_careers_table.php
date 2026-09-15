<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('salary_range');
            $table->string('demand_level');
            $table->json('required_skills');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('careers');
    }
};
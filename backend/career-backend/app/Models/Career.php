<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = [
        'title',
        'description',
        'salary_range',
        'demand_level',
        'required_skills',
    ];

    protected $casts = [
        'required_skills' => 'array',
    ];
}
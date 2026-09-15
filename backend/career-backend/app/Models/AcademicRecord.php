<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicRecord extends Model
{
    protected $fillable = [
        'user_id',
        'gpa',
        'semester',
        'subjects',
    ];

    protected $casts = [
        'subjects' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
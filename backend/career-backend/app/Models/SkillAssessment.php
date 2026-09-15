<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillAssessment extends Model
{
    protected $fillable = [
        'user_id',
        'ratings',
    ];

    protected $casts = [
        'ratings' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
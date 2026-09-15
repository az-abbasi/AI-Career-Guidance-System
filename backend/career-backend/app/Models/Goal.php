<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $fillable = ['user_id', 'title', 'description', 'career', 'deadline', 'status', 'progress'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

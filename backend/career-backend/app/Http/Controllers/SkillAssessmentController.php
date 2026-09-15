<?php

namespace App\Http\Controllers;

use App\Models\SkillAssessment;
use Illuminate\Http\Request;

class SkillAssessmentController extends Controller
{
    public function store(Request $request)
    {
        $skill = SkillAssessment::updateOrCreate(
            ['user_id' => $request->user()->id],
            ['ratings' => $request->ratings]
        );

        return response()->json([
            'message' => 'Skills saved!',
            'skill' => $skill
        ]);
    }

    public function show(Request $request)
    {
        $skill = SkillAssessment::where('user_id', $request->user()->id)->first();
        return response()->json($skill);
    }
}
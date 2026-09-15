<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;

class AssessmentController extends Controller
{
    // Save Assessment
    public function store(Request $request)
    {
        $assessment = Assessment::updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'interests' => $request->interests,
                'skills' => $request->skills,
                'recommended_career' => $request->recommended_career,
            ]
        );

        return response()->json([
            'message' => 'Assessment saved!',
            'assessment' => $assessment
        ]);
    }

    // Get Assessment
    public function show(Request $request)
    {
        $assessment = Assessment::where('user_id', $request->user()->id)->first();
        return response()->json($assessment);
    }

    // Get All Assessments (Admin)
    public function getAllAssessments()
    {
        $assessments = Assessment::with('user')->get();
        return response()->json($assessments);
    }
}
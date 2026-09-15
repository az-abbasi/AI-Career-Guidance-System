<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIRecommendationController extends Controller
{
    public function recommend(Request $request)
    {
        $data = $request->all();

        $prompt = "You are an AI Career Guidance Expert. Analyze this student's data and provide personalized career recommendations.

Student Profile:
- Name: " . ($data['name'] ?? 'Student') . "
- Degree: " . ($data['degree'] ?? 'Not specified') . "
- University: " . ($data['university'] ?? 'Not specified') . "
- GPA: " . ($data['gpa'] ?? 'Not provided') . "
- Current Semester: " . ($data['semester'] ?? 'Not provided') . "

Skills Assessment (rated 1-5):
" . ($data['skills'] ?? 'No skills rated') . "

Selected Interests:
" . ($data['interests'] ?? 'No interests selected') . "

Previously Recommended Career: " . ($data['recommended_career'] ?? 'None') . "

Please provide:
1. TOP 3 CAREER RECOMMENDATIONS with match percentage
2. BEST CAREER MATCH explanation (2-3 sentences)
3. KEY STRENGTHS of this student
4. SKILLS TO IMPROVE for better career prospects
5. PERSONALIZED ADVICE (2-3 sentences)

Format your response clearly with these exact headings:
TOP 3 CAREERS:
BEST MATCH EXPLANATION:
KEY STRENGTHS:
SKILLS TO IMPROVE:
PERSONALIZED ADVICE:";

        try {
            $response = Http::timeout(60)->withHeaders([
                'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
                'Content-Type' => 'application/json',
            ])->post('https://openrouter.ai/api/v1/chat/completions', [
                'model' => 'openrouter/free',
                'messages' => [
                    ['role' => 'user', 'content' => $prompt]
                ],
            ]);

            $result = $response->json();
            $text = $result['choices'][0]['message']['content'] ?? 'No response received';

            return response()->json(['recommendation' => $text]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    public function store(Request $request)
    {
        $userId = auth()->id();
        if (!$userId) {
            $user = \App\Models\User::first();
            $userId = $user ? $user->id : 1;
        }

        $senderInfo = $request->name ? "[Inquiry from {$request->name} ({$request->email})]\n" : "";
        $commentText = $senderInfo . ($request->comment ?? $request->comments ?? $request->message ?? 'No details provided');

        $feedback = Feedback::create([
            'user_id' => $userId,
            'rating' => $request->rating ?? 5,
            'category' => $request->category ?? 'Contact Us Inquiry',
            'comment' => $commentText,
        ]);

        return response()->json(['message' => 'Feedback submitted successfully!', 'feedback' => $feedback]);
    }

    public function index()
    {
        $feedbacks = Feedback::with('user')->latest()->get();
        return response()->json($feedbacks);
    }
}
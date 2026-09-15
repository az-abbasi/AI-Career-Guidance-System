<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;

class GoalController extends Controller
{
    public function index()
    {
        $goals = Goal::where('user_id', auth()->id())->latest()->get();
        return response()->json($goals);
    }

    public function store(Request $request)
    {
        $goal = Goal::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'career' => $request->career,
            'deadline' => $request->deadline,
            'status' => 'pending',
            'progress' => 0,
        ]);
        return response()->json(['message' => 'Goal created!', 'goal' => $goal]);
    }

    public function update(Request $request, $id)
    {
        $goal = Goal::where('user_id', auth()->id())->findOrFail($id);
        $goal->update($request->only(['title', 'description', 'career', 'deadline', 'status', 'progress']));
        return response()->json(['message' => 'Goal updated!', 'goal' => $goal]);
    }

    public function destroy($id)
    {
        $goal = Goal::where('user_id', auth()->id())->findOrFail($id);
        $goal->delete();
        return response()->json(['message' => 'Goal deleted!']);
    }
}
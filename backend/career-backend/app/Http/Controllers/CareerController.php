<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    // Get All Careers
    public function index()
    {
        $careers = Career::all();
        return response()->json($careers);
    }

    // Get Single Career
    public function show($id)
    {
        $career = Career::findOrFail($id);
        return response()->json($career);
    }

    // Add Career (Admin)
    public function store(Request $request)
    {
        $career = Career::create([
            'title' => $request->title,
            'description' => $request->description,
            'salary_range' => $request->salary_range,
            'demand_level' => $request->demand_level,
            'required_skills' => $request->required_skills,
        ]);

        return response()->json([
            'message' => 'Career added!',
            'career' => $career
        ], 201);
    }

    // Update Career (Admin)
    public function update(Request $request, $id)
    {
        $career = Career::findOrFail($id);
        $career->update($request->all());
        return response()->json(['message' => 'Career updated!', 'career' => $career]);
    }

    // Delete Career (Admin)
    public function destroy($id)
    {
        Career::findOrFail($id)->delete();
        return response()->json(['message' => 'Career deleted!']);
    }
}
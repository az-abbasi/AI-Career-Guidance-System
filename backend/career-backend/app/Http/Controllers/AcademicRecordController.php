<?php

namespace App\Http\Controllers;

use App\Models\AcademicRecord;
use Illuminate\Http\Request;

class AcademicRecordController extends Controller
{
    public function store(Request $request)
    {
        $record = AcademicRecord::updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'gpa' => $request->gpa,
                'semester' => $request->semester,
                'subjects' => $request->subjects,
            ]
        );

        return response()->json([
            'message' => 'Academic record saved!',
            'record' => $record
        ]);
    }

    public function show(Request $request)
    {
        $record = AcademicRecord::where('user_id', $request->user()->id)->first();
        return response()->json($record);
    }

    public function getAllRecords()
    {
        $records = AcademicRecord::with('user')->get();
        return response()->json($records);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register a new user account (Student)
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
            'university' => 'nullable|string',
            'degree' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'university' => $request->university,
            'degree' => $request->degree,
            'role' => 'student', // Default registration assignment role
        ]);

        return response()->json([
            'message' => 'Registration successful!',
            'user' => $user
        ], 201);
    }

    // Authenticate user session credentials (Student or Admin)
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials!'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful!',
            'token' => $token,
            'user' => $user
        ]);
    }

    // Revoke current authentication access token authorization
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully!']);
    }

    // Retrieve active identity profile parameters
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }

    // Update profile attributes for the authenticated user
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $user->update($request->only(['name', 'university', 'degree']));
        return response()->json(['message' => 'Profile updated!', 'user' => $user]);
    }

    /*
    |--------------------------------------------------------------------------
    | Administrative Operations Control Matrix
    |--------------------------------------------------------------------------
    */

    // Fetch all records where the database user role equals student
   public function getAllStudents()
{
    // Temporary change to fetch absolutely ALL users from database without role filtering
    $students = \App\Models\User::all();
    
    return response()->json([
        'success' => true,
        'students' => $students
    ], 200);
}

    // Remove specific student identity structures permanently from storage
    public function deleteStudent($id)
    {
        $student = User::find($id);

        if (!$student) {
            return response()->json(['message' => 'Student record not found!'], 404);
        }

        // Security check to protect admin records from being deleted through this controller route
        if ($student->role === 'admin') {
            return response()->json(['message' => 'Action denied. Cannot delete administrative accounts.'], 403);
        }

        $student->delete();
        return response()->json(['message' => 'Student deleted successfully!'], 200);
    }
}
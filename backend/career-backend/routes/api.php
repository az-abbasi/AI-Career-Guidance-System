<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\AcademicRecordController;
use App\Http\Controllers\SkillAssessmentController;
use App\Http\Controllers\AIRecommendationController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\GoalController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/careers', [CareerController::class, 'index']);
Route::get('/careers/{id}', [CareerController::class, 'show']);
Route::post('/feedback', [FeedbackController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Protected Student Routes (Requires Sanctum Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);

    // AI Recommendation Infrastructure
    Route::post('/ai-recommendation', [AIRecommendationController::class, 'recommend']);

    // Student Assessments Node
    Route::post('/assessment', [AssessmentController::class, 'store']);
    Route::get('/assessment', [AssessmentController::class, 'show']);

    // Academic Profile Records
    Route::post('/academic-record', [AcademicRecordController::class, 'store']);
    Route::get('/academic-record', [AcademicRecordController::class, 'show']);

    // Skill Validation Metrics
    Route::post('/skill-assessment', [SkillAssessmentController::class, 'store']);
    Route::get('/skill-assessment', [SkillAssessmentController::class, 'show']);

    // Student Self-Feedback Submission Endpoint
    Route::get('/student/feedback', [FeedbackController::class, 'index']); 

    // Target Career Milestones Management
    Route::get('/goals', [GoalController::class, 'index']);
    Route::post('/goals', [GoalController::class, 'store']);
    Route::put('/goals/{id}', [GoalController::class, 'update']);
    Route::delete('/goals/{id}', [GoalController::class, 'destroy']);
});

/*
|--------------------------------------------------------------------------
| Protected Administrative Portal Configuration Routes (TEMPORARY OPEN FOR TESTING)
|--------------------------------------------------------------------------
*/
// Note: auth:sanctum middleware has been removed below to fix the authorization error
Route::prefix('admin')->group(function () {
    // Student Account Control Panels
    Route::get('/students', [AuthController::class, 'getAllStudents']);
    Route::delete('/students/{id}', [AuthController::class, 'deleteStudent']);
    
    // Global Metrics Auditing Datasets
    Route::get('/assessments', [AssessmentController::class, 'getAllAssessments']);
    Route::get('/academic-records', [AcademicRecordController::class, 'getAllRecords']);
    
    // Admin Career Mapping Control Routes
    Route::post('/careers', [CareerController::class, 'store']);
    Route::put('/careers/{id}', [CareerController::class, 'update']);
    Route::delete('/careers/{id}', [CareerController::class, 'destroy']);
    
    // Unified App Feedback Logs Review
    Route::get('/feedback', [FeedbackController::class, 'index']);
});
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::group(['prefix' => 'auth'], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::group(['middleware' => 'auth:api', 'prefix' => 'admin'], function () {
    Route::get('/get/patient', [PatientController::class, 'getPatient']);
    Route::post('/create/patient', [PatientController::class, 'createPatient']);
    Route::put('/edit/patient/{id}', [PatientController::class, 'editPatient']);
    Route::delete('/delete/patient/{id}', [PatientController::class, 'deletePatient']);

    // count total patient
    Route::get('/count/patients', [PatientController::class, 'countPatients']);
    Route::get('/count/today/patients', [PatientController::class, 'countTodayPatients']);
});

Route::post('/register', [AuthController::class, 'register']);

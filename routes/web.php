<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetController;


Route::prefix('pet')->group(function () {
    Route::get('/', [PetController::class, 'index'])->name('pet.index');
    Route::get('/findByStatus', [PetController::class, 'findByStatus'])->name('pet.findByStatus');
    Route::post('/', [PetController::class, 'store']);
    Route::put('/', [PetController::class, 'update']);
    Route::prefix('{id}')->group(function () {
        Route::get('/', [PetController::class, 'show']);
        Route::delete('/', [PetController::class, 'destroy']);
    });
});

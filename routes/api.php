<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\WalletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function() {
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::get('/currencies', [CurrencyController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/wallets', [WalletController::class, 'store']);
Route::put('/wallets/{walletId}', [WalletController::class, 'update']);
Route::delete('/wallets/{walletId}', [WalletController::class, 'destroy']);
Route::post('/transactions', [TransactionController::class, 'store']);
Route::delete('/transactions/{transactionId}', [TransactionController::class, 'destroy']);
Route::get('/transactions', [TransactionController::class, 'index']);
Route::get('/wallets', [WalletController::class, 'index']);
Route::get('/wallets/{walletId}', [WalletController::class, 'show']);
Route::get('/reports/summary-by-category/expense', [TransactionController::class, 'get']);
Route::get('/reports/summary-by-category/income', [TransactionController::class, 'getIncome']);
     
});
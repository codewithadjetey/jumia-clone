<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SystemController;
use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\BrandController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\NewsletterController;

/*
|--------------------------------------------------------------------------
| Guest/Public API Routes (v1)
|--------------------------------------------------------------------------
|
| These routes are accessible without authentication
|
*/

Route::prefix('v1')->group(function () {
    // Health check and system info
    Route::get('/health', [SystemController::class, 'health']);
    Route::get('/system/info', [SystemController::class, 'info']);

    // Public product endpoints
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products/featured', [ProductController::class, 'featured']);
    Route::get('/products/search', [ProductController::class, 'search']);
    Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory']);
    Route::get('/products/autocomplete', [ProductController::class, 'autocomplete']);
    Route::get('/products/flash-sales', [ProductController::class, 'flashSales']);
    Route::get('/products/daily-deals', [ProductController::class, 'dailyDeals']);
    Route::post('/products/compare', [ProductController::class, 'compare']);

    // Public category endpoints
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);

    // Public brand endpoints
    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/brands/{id}', [BrandController::class, 'show']);

    // Public review endpoints
    Route::get('/reviews/product/{productId}', [ReviewController::class, 'getProductReviews']);

    // Authentication endpoints (public)
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/auth/google', [AuthController::class, 'google']);
    Route::post('/auth/facebook', [AuthController::class, 'facebook']);

    // Newsletter endpoints (public)
    Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
    Route::post('/newsletter/unsubscribe', [NewsletterController::class, 'unsubscribe']);
});


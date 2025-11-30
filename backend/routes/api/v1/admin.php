<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\V1\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\V1\Admin\BrandController as AdminBrandController;
use App\Http\Controllers\Api\V1\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Api\V1\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\V1\Admin\CouponController as AdminCouponController;
use App\Http\Controllers\Api\V1\Admin\ReviewController as AdminReviewController;

/*
|--------------------------------------------------------------------------
| Admin API Routes (v1)
|--------------------------------------------------------------------------
|
| These routes require authentication and admin role
|
*/

Route::prefix('v1')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Products management
    Route::apiResource('admin/products', AdminProductController::class);

    // Categories management
    Route::apiResource('admin/categories', AdminCategoryController::class);

    // Brands management
    Route::apiResource('admin/brands', AdminBrandController::class);

    // Orders management
    Route::get('admin/orders', [AdminOrderController::class, 'index']);
    Route::get('admin/orders/{id}', [AdminOrderController::class, 'show']);
    Route::put('admin/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);

    // Users management
    Route::get('admin/users', [AdminUserController::class, 'index']);
    Route::get('admin/users/{id}', [AdminUserController::class, 'show']);
    Route::put('admin/users/{id}', [AdminUserController::class, 'update']);
    Route::delete('admin/users/{id}', [AdminUserController::class, 'destroy']);

    // Coupons management
    Route::apiResource('admin/coupons', AdminCouponController::class);

    // Reviews moderation
    Route::get('admin/reviews', [AdminReviewController::class, 'index']);
    Route::put('admin/reviews/{id}/approve', [AdminReviewController::class, 'approve']);
    Route::put('admin/reviews/{id}/reject', [AdminReviewController::class, 'reject']);
    Route::delete('admin/reviews/{id}', [AdminReviewController::class, 'destroy']);
});


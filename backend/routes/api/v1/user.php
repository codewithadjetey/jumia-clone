<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CartController;
use App\Http\Controllers\Api\V1\OrderController;
use App\Http\Controllers\Api\V1\AddressController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\WishlistController;
use App\Http\Controllers\Api\V1\CouponController;
use App\Http\Controllers\Api\V1\ProductController;

/*
|--------------------------------------------------------------------------
| Authenticated User API Routes (v1)
|--------------------------------------------------------------------------
|
| These routes require authentication via Sanctum
|
*/

Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    // Auth endpoints
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Cart endpoints
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/update/{itemId}', [CartController::class, 'update']);
    Route::delete('/cart/remove/{itemId}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    Route::post('/cart/apply-coupon', [CartController::class, 'applyCoupon']);
    Route::delete('/cart/remove-coupon', [CartController::class, 'removeCoupon']);

    // Order endpoints
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/create', [OrderController::class, 'create']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    Route::get('/orders/{id}/track', [OrderController::class, 'track']);

    // Address endpoints
    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/addresses', [AddressController::class, 'store']);
    Route::put('/addresses/{id}', [AddressController::class, 'update']);
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy']);
    Route::put('/addresses/{id}/set-default', [AddressController::class, 'setDefault']);

    // Review endpoints
    Route::post('/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::post('/reviews/{id}/helpful', [ReviewController::class, 'markHelpful']);

    // Wishlist endpoints
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::post('/wishlist/add', [WishlistController::class, 'add']);
    Route::delete('/wishlist/remove/{productId}', [WishlistController::class, 'remove']);

    // Coupon endpoints
    Route::post('/coupons/validate', [CouponController::class, 'validate']);
    Route::get('/coupons/available', [CouponController::class, 'available']);

    // Product endpoints (authenticated)
    Route::post('/products/{id}/view', [ProductController::class, 'trackView']);
    Route::get('/products/recently-viewed', [ProductController::class, 'recentlyViewed']);
});


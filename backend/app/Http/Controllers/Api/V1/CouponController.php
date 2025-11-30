<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CouponController extends Controller
{
    public function validate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric|min:0',
        ]);

        $coupon = Coupon::where('code', $validated['code'])->first();

        if (!$coupon || !$coupon->isValid()) {
            return response()->json(['message' => 'Invalid or expired coupon'], 400);
        }

        $discount = $coupon->calculateDiscount($validated['amount']);

        return response()->json([
            'valid' => true,
            'discount' => $discount,
            'coupon' => $coupon,
        ]);
    }

    public function available(): JsonResponse
    {
        $coupons = Coupon::active()->get();

        return response()->json($coupons);
    }
}

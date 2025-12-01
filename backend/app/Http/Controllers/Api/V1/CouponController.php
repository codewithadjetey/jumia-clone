<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Coupons",
 *     description="Coupon management endpoints"
 * )
 */
class CouponController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/coupons/validate",
     *     summary="Validate coupon code",
     *     tags={"Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"code","amount"},
     *             @OA\Property(property="code", type="string", example="SAVE10"),
     *             @OA\Property(property="amount", type="number", example=100.00)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Coupon validation result"
     *     )
     * )
     */
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

    /**
     * @OA\Get(
     *     path="/api/v1/coupons/available",
     *     summary="Get available coupons",
     *     tags={"Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of available coupons"
     *     )
     * )
     */
    public function available(): JsonResponse
    {
        $coupons = Coupon::active()->get();

        return response()->json($coupons);
    }
}

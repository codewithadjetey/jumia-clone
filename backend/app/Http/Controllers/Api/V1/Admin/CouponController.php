<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Admin - Coupons",
 *     description="Admin coupon management endpoints"
 * )
 */
class CouponController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/coupons",
     *     summary="List all coupons (Admin)",
     *     tags={"Admin - Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="List of coupons")
     * )
     */
    public function index(): JsonResponse
    {
        $coupons = Coupon::latest()->paginate(20);
        return response()->json($coupons);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/admin/coupons",
     *     summary="Create coupon (Admin)",
     *     tags={"Admin - Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"code","type","value","valid_from","valid_to"},
     *             @OA\Property(property="code", type="string", example="SAVE10"),
     *             @OA\Property(property="type", type="string", enum={"percentage","fixed"}, example="percentage"),
     *             @OA\Property(property="value", type="number", example=10),
     *             @OA\Property(property="min_purchase", type="number", example=100),
     *             @OA\Property(property="max_discount", type="number", example=50),
     *             @OA\Property(property="valid_from", type="string", format="date-time"),
     *             @OA\Property(property="valid_to", type="string", format="date-time"),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Coupon created successfully")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:coupons,code',
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0',
            'min_purchase' => 'nullable|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'valid_from' => 'required|date',
            'valid_to' => 'required|date|after:valid_from',
            'is_active' => 'boolean',
        ]);

        $coupon = Coupon::create($validated);
        return response()->json($coupon, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/coupons/{id}",
     *     summary="Get coupon details (Admin)",
     *     tags={"Admin - Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Coupon details")
     * )
     */
    public function show($id): JsonResponse
    {
        $coupon = Coupon::findOrFail($id);
        return response()->json($coupon);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/coupons/{id}",
     *     summary="Update coupon (Admin)",
     *     tags={"Admin - Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="code", type="string"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Coupon updated successfully")
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $coupon = Coupon::findOrFail($id);

        $validated = $request->validate([
            'code' => 'sometimes|string|unique:coupons,code,' . $id,
            'type' => 'sometimes|in:percentage,fixed',
            'value' => 'sometimes|numeric|min:0',
            'min_purchase' => 'nullable|numeric|min:0',
            'max_discount' => 'nullable|numeric|min:0',
            'valid_from' => 'sometimes|date',
            'valid_to' => 'sometimes|date|after:valid_from',
            'is_active' => 'boolean',
        ]);

        $coupon->update($validated);
        return response()->json($coupon);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/coupons/{id}",
     *     summary="Delete coupon (Admin)",
     *     tags={"Admin - Coupons"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Coupon deleted successfully")
     * )
     */
    public function destroy($id): JsonResponse
    {
        Coupon::findOrFail($id)->delete();
        return response()->json(['message' => 'Coupon deleted']);
    }
}

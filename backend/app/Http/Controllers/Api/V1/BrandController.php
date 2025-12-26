<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;

/**
 * @OA\Tag(
 *     name="Brands",
 *     description="Brand endpoints"
 * )
 */
class BrandController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/brands",
     *     summary="List all brands",
     *     tags={"Brands"},
     *     @OA\Response(
     *         response=200,
     *         description="List of brands"
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $brands = Brand::where('is_active', true)->get();

        return response()->json($brands);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/brands/{id}",
     *     summary="Get brand details",
     *     tags={"Brands"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Brand details with products"
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        $brand = Brand::with(['products' => function ($query) {
            $query->where('is_active', true)->limit(20);
        }])->findOrFail($id);

        return response()->json($brand);
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * @OA\Tag(
 *     name="Admin - Brands",
 *     description="Admin brand management endpoints"
 * )
 */
class BrandController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/brands",
     *     summary="List all brands (Admin)",
     *     tags={"Admin - Brands"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="List of brands")
     * )
     */
    public function index(): JsonResponse
    {
        $brands = Brand::all();
        return response()->json($brands);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/admin/brands",
     *     summary="Create brand (Admin)",
     *     tags={"Admin - Brands"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Nike"),
     *             @OA\Property(property="logo", type="string"),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Brand created successfully")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $brand = Brand::create($validated);
        return response()->json($brand, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/brands/{id}",
     *     summary="Get brand details (Admin)",
     *     tags={"Admin - Brands"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Brand details")
     * )
     */
    public function show($id): JsonResponse
    {
        $brand = Brand::findOrFail($id);
        return response()->json($brand);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/brands/{id}",
     *     summary="Update brand (Admin)",
     *     tags={"Admin - Brands"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Brand updated successfully")
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $brand = Brand::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'logo' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $brand->update($validated);
        return response()->json($brand);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/brands/{id}",
     *     summary="Delete brand (Admin)",
     *     tags={"Admin - Brands"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Brand deleted successfully")
     * )
     */
    public function destroy($id): JsonResponse
    {
        Brand::findOrFail($id)->delete();
        return response()->json(['message' => 'Brand deleted']);
    }
}

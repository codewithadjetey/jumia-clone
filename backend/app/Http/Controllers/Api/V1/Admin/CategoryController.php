<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * @OA\Tag(
 *     name="Admin - Categories",
 *     description="Admin category management endpoints"
 * )
 */
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/categories",
     *     summary="List all categories (Admin)",
     *     tags={"Admin - Categories"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="List of categories")
     * )
     */
    public function index(): JsonResponse
    {
        $categories = Category::with('children')->whereNull('parent_id')->get();
        return response()->json($categories);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/admin/categories",
     *     summary="Create category (Admin)",
     *     tags={"Admin - Categories"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name"},
     *             @OA\Property(property="name", type="string", example="Electronics"),
     *             @OA\Property(property="parent_id", type="integer"),
     *             @OA\Property(property="image", type="string"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="is_active", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(response=201, description="Category created successfully")
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/categories/{id}",
     *     summary="Get category details (Admin)",
     *     tags={"Admin - Categories"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Category details")
     * )
     */
    public function show($id): JsonResponse
    {
        $category = Category::with('children')->findOrFail($id);
        return response()->json($category);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/categories/{id}",
     *     summary="Update category (Admin)",
     *     tags={"Admin - Categories"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Category updated successfully")
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);
        return response()->json($category);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/categories/{id}",
     *     summary="Delete category (Admin)",
     *     tags={"Admin - Categories"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Category deleted successfully")
     * )
     */
    public function destroy($id): JsonResponse
    {
        Category::findOrFail($id)->delete();
        return response()->json(['message' => 'Category deleted']);
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * @OA\Tag(
 *     name="Admin - Products",
 *     description="Admin product management endpoints"
 * )
 */
class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/products",
     *     summary="List all products (Admin)",
     *     tags={"Admin - Products"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of products"
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        $products = Product::with(['category', 'brand', 'images'])->paginate(20);
        return response()->json($products);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/admin/products",
     *     summary="Create product (Admin)",
     *     tags={"Admin - Products"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","sku","price","stock_quantity","category_id"},
     *             @OA\Property(property="name", type="string", example="Product Name"),
     *             @OA\Property(property="sku", type="string", example="SKU123"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="price", type="number", example=99.99),
     *             @OA\Property(property="sale_price", type="number", example=79.99),
     *             @OA\Property(property="stock_quantity", type="integer", example=100),
     *             @OA\Property(property="category_id", type="integer", example=1),
     *             @OA\Property(property="brand_id", type="integer", example=1),
     *             @OA\Property(property="is_active", type="boolean", example=true),
     *             @OA\Property(property="featured", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Product created successfully"
     *     )
     * )
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $product = Product::create($validated);

        return response()->json($product->load(['category', 'brand', 'images']), 201);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/products/{id}",
     *     summary="Get product details (Admin)",
     *     tags={"Admin - Products"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product details"
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        $product = Product::with(['category', 'brand', 'images', 'reviews'])->findOrFail($id);
        return response()->json($product);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/products/{id}",
     *     summary="Update product (Admin)",
     *     tags={"Admin - Products"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="sku", type="string"),
     *             @OA\Property(property="price", type="number"),
     *             @OA\Property(property="stock_quantity", type="integer"),
     *             @OA\Property(property="is_active", type="boolean")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product updated successfully"
     *     )
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'sku' => 'sometimes|string|unique:products,sku,' . $id,
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'sometimes|integer|min:0',
            'category_id' => 'sometimes|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json($product->load(['category', 'brand', 'images']));
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/products/{id}",
     *     summary="Delete product (Admin)",
     *     tags={"Admin - Products"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product deleted successfully"
     *     )
     * )
     */
    public function destroy($id): JsonResponse
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}

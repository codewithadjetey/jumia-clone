<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Wishlist",
 *     description="Wishlist management endpoints"
 * )
 */
class WishlistController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/wishlist",
     *     summary="Get user's wishlist",
     *     tags={"Wishlist"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of wishlist items"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $wishlist = Wishlist::with('product.images')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($wishlist);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/wishlist/add",
     *     summary="Add to wishlist",
     *     tags={"Wishlist"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id"},
     *             @OA\Property(property="product_id", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Item added to wishlist"
     *     )
     * )
     */
    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlist = Wishlist::firstOrCreate([
            'user_id' => $request->user()->id,
            'product_id' => $validated['product_id'],
        ]);

        return response()->json($wishlist->load('product'), 201);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/wishlist/remove/{productId}",
     *     summary="Remove from wishlist",
     *     tags={"Wishlist"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="productId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Item removed from wishlist"
     *     )
     * )
     */
    public function remove(Request $request, $productId): JsonResponse
    {
        Wishlist::where('user_id', $request->user()->id)
            ->where('product_id', $productId)
            ->delete();

        return response()->json(['message' => 'Item removed from wishlist']);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\AddToCartRequest;
use App\Http\Resources\Api\V1\CartItemResource;
use App\Models\CartItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Cart",
 *     description="Shopping cart endpoints"
 * )
 */
class CartController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/cart",
     *     summary="Get user's cart",
     *     tags={"Cart"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Cart items",
     *         @OA\JsonContent(
     *             @OA\Property(property="items", type="array", @OA\Items(type="object")),
     *             @OA\Property(property="total", type="number", example=150.00)
     *         )
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $cartItems = CartItem::with('product.images')
            ->where('user_id', $request->user()->id)
            ->get();

        $total = $cartItems->sum('total');

        return response()->json([
            'items' => CartItemResource::collection($cartItems),
            'total' => $total,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/cart/add",
     *     summary="Add item to cart",
     *     tags={"Cart"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id","quantity"},
     *             @OA\Property(property="product_id", type="integer", example=1),
     *             @OA\Property(property="quantity", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Item added to cart"
     *     )
     * )
     */
    public function add(AddToCartRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
            ],
            ['quantity' => $validated['quantity']]
        );

        return response()->json(new CartItemResource($cartItem->load('product')), 201);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/cart/update/{itemId}",
     *     summary="Update cart item quantity",
     *     tags={"Cart"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="itemId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"quantity"},
     *             @OA\Property(property="quantity", type="integer", example=3)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Cart item updated"
     *     )
     * )
     */
    public function update(Request $request, $itemId): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->findOrFail($itemId);

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json(new CartItemResource($cartItem->load('product')));
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/cart/remove/{itemId}",
     *     summary="Remove item from cart",
     *     tags={"Cart"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="itemId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Item removed from cart"
     *     )
     * )
     */
    public function remove(Request $request, $itemId): JsonResponse
    {
        CartItem::where('user_id', $request->user()->id)
            ->findOrFail($itemId)
            ->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/cart/clear",
     *     summary="Clear entire cart",
     *     tags={"Cart"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Cart cleared"
     *     )
     * )
     */
    public function clear(Request $request): JsonResponse
    {
        CartItem::where('user_id', $request->user()->id)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}

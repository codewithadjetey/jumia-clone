<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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
    public function index(Request $request): JsonResponse
    {
        $cartItems = CartItem::with('product.images')
            ->where('user_id', $request->user()->id)
            ->get();

        $total = $cartItems->sum('total');

        return response()->json([
            'items' => $cartItems,
            'total' => $total,
        ]);
    }

    public function add(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'product_id' => $validated['product_id'],
            ],
            ['quantity' => $validated['quantity']]
        );

        return response()->json($cartItem->load('product'), 201);
    }

    public function update(Request $request, $itemId): JsonResponse
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::where('user_id', $request->user()->id)
            ->findOrFail($itemId);

        $cartItem->update(['quantity' => $validated['quantity']]);

        return response()->json($cartItem->load('product'));
    }

    public function remove(Request $request, $itemId): JsonResponse
    {
        CartItem::where('user_id', $request->user()->id)
            ->findOrFail($itemId)
            ->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    public function clear(Request $request): JsonResponse
    {
        CartItem::where('user_id', $request->user()->id)->delete();

        return response()->json(['message' => 'Cart cleared']);
    }
}

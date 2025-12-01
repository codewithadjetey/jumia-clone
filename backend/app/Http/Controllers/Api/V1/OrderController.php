<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CreateOrderRequest;
use App\Http\Resources\Api\V1\OrderResource;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * @OA\Tag(
 *     name="Orders",
 *     description="Order management endpoints"
 * )
 */
class OrderController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/orders",
     *     summary="Get user's orders",
     *     tags={"Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of orders"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $orders = Order::with(['items.product', 'shippingAddress', 'billingAddress'])
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(20);

        return OrderResource::collection($orders)->response();
    }

    /**
     * @OA\Get(
     *     path="/api/v1/orders/{id}",
     *     summary="Get order details",
     *     tags={"Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order details"
     *     )
     * )
     */
    public function show(Request $request, $id): JsonResponse
    {
        $order = Order::with(['items.product', 'shippingAddress', 'billingAddress'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json(new OrderResource($order));
    }

    /**
     * @OA\Post(
     *     path="/api/v1/orders/create",
     *     summary="Create new order",
     *     tags={"Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"shipping_address_id","billing_address_id"},
     *             @OA\Property(property="shipping_address_id", type="integer", example=1),
     *             @OA\Property(property="billing_address_id", type="integer", example=1),
     *             @OA\Property(property="payment_method", type="string", example="cash_on_delivery")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Order created successfully"
     *     )
     * )
     */
    public function create(CreateOrderRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $cartItems = CartItem::with('product')
            ->where('user_id', $request->user()->id)
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 400);
        }

        $subtotal = $cartItems->sum('total');
        $tax = $subtotal * 0.1; // 10% tax
        $shipping = 10.00; // Fixed shipping
        $total = $subtotal + $tax + $shipping;

        $order = Order::create([
            'user_id' => $request->user()->id,
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'status' => 'pending',
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $total,
            'payment_status' => 'pending',
            'payment_method' => $validated['payment_method'] ?? 'cash_on_delivery',
            'shipping_address_id' => $validated['shipping_address_id'],
            'billing_address_id' => $validated['billing_address_id'],
        ]);

        foreach ($cartItems as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'quantity' => $cartItem->quantity,
                'price' => $cartItem->product->current_price,
                'total' => $cartItem->total,
            ]);
        }

        CartItem::where('user_id', $request->user()->id)->delete();

        return response()->json(new OrderResource($order->load(['items.product', 'shippingAddress', 'billingAddress'])), 201);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/orders/{id}/cancel",
     *     summary="Cancel order",
     *     tags={"Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Order cancelled successfully"
     *     )
     * )
     */
    public function cancel(Request $request, $id): JsonResponse
    {
        $order = Order::where('user_id', $request->user()->id)
            ->findOrFail($id);

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Only pending orders can be cancelled'], 400);
        }

        $order->update(['status' => 'cancelled']);

        return response()->json(['message' => 'Order cancelled successfully']);
    }
}

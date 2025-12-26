<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Admin - Orders",
 *     description="Admin order management endpoints"
 * )
 */
class OrderController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/orders",
     *     summary="List all orders (Admin)",
     *     tags={"Admin - Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="List of orders")
     * )
     */
    public function index(): JsonResponse
    {
        $orders = Order::with(['user', 'items.product', 'shippingAddress', 'billingAddress'])
            ->latest()
            ->paginate(20);

        return response()->json($orders);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/orders/{id}",
     *     summary="Get order details (Admin)",
     *     tags={"Admin - Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Order details")
     * )
     */
    public function show($id): JsonResponse
    {
        $order = Order::with(['user', 'items.product', 'shippingAddress', 'billingAddress'])
            ->findOrFail($id);

        return response()->json($order);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/orders/{id}/status",
     *     summary="Update order status (Admin)",
     *     tags={"Admin - Orders"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"status"},
     *             @OA\Property(property="status", type="string", enum={"pending","processing","shipped","delivered","cancelled"}, example="processing")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Order status updated successfully")
     * )
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $validated['status']]);

        return response()->json($order);
    }
}

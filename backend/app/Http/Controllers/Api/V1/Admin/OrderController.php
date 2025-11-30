<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        $orders = Order::with(['user', 'items.product', 'shippingAddress', 'billingAddress'])
            ->latest()
            ->paginate(20);

        return response()->json($orders);
    }

    public function show($id): JsonResponse
    {
        $order = Order::with(['user', 'items.product', 'shippingAddress', 'billingAddress'])
            ->findOrFail($id);

        return response()->json($order);
    }

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

<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_number' => $this->order_number,
            'status' => $this->status,
            'subtotal' => (float) $this->subtotal,
            'tax' => (float) $this->tax,
            'shipping' => (float) $this->shipping,
            'total' => (float) $this->total,
            'payment_status' => $this->payment_status,
            'payment_method' => $this->payment_method,
            'items' => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'product' => new ProductResource($item->product),
                        'quantity' => $item->quantity,
                        'price' => (float) $item->price,
                        'total' => (float) $item->total,
                    ];
                });
            }),
            'shipping_address' => $this->whenLoaded('shippingAddress', function () {
                return [
                    'id' => $this->shippingAddress->id,
                    'street' => $this->shippingAddress->street,
                    'city' => $this->shippingAddress->city,
                    'state' => $this->shippingAddress->state,
                    'country' => $this->shippingAddress->country,
                    'postal_code' => $this->shippingAddress->postal_code,
                ];
            }),
            'billing_address' => $this->whenLoaded('billingAddress', function () {
                return [
                    'id' => $this->billingAddress->id,
                    'street' => $this->billingAddress->street,
                    'city' => $this->billingAddress->city,
                    'state' => $this->billingAddress->state,
                    'country' => $this->billingAddress->country,
                    'postal_code' => $this->billingAddress->postal_code,
                ];
            }),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}

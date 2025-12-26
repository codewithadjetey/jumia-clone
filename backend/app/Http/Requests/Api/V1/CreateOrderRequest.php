<?php

namespace App\Http\Requests\Api\V1;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'shipping_address_id' => 'required|exists:addresses,id',
            'billing_address_id' => 'required|exists:addresses,id',
            'payment_method' => 'nullable|string',
            'delivery_slot' => 'nullable|string|in:morning,afternoon,evening',
            'order_notes' => 'nullable|string|max:1000',
            'coupon_code' => 'nullable|string',
        ];
    }
}

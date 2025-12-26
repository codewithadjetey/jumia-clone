<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'sku' => $this->sku,
            'description' => $this->description,
            'price' => (float) $this->price,
            'sale_price' => $this->sale_price ? (float) $this->sale_price : null,
            'flash_sale_price' => $this->flash_sale_price ? (float) $this->flash_sale_price : null,
            'flash_sale_start' => $this->flash_sale_start?->toIso8601String(),
            'flash_sale_end' => $this->flash_sale_end?->toIso8601String(),
            'current_price' => (float) $this->current_price,
            'stock_quantity' => $this->stock_quantity,
            'is_active' => $this->is_active,
            'featured' => $this->featured,
            'average_rating' => $this->average_rating ? (float) $this->average_rating : 0,
            'review_count' => $this->review_count ?? 0,
            'discount_percentage' => $this->discount_percentage,
            'category' => $this->whenLoaded('category', function () {
                return new CategoryResource($this->category);
            }),
            'brand' => $this->whenLoaded('brand', function () {
                return $this->brand ? new BrandResource($this->brand) : null;
            }),
            'images' => $this->whenLoaded('images', function () {
                return $this->images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path,
                        'is_primary' => $image->is_primary,
                    ];
                });
            }),
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}

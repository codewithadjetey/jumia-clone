<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'sku',
        'description',
        'price',
        'sale_price',
        'stock_quantity',
        'category_id',
        'brand_id',
        'is_active',
        'featured',
        'flash_sale_start',
        'flash_sale_end',
        'flash_sale_price',
        'average_rating',
        'review_count',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'sale_price' => 'decimal:2',
        'flash_sale_price' => 'decimal:2',
        'average_rating' => 'decimal:2',
        'is_active' => 'boolean',
        'featured' => 'boolean',
        'flash_sale_start' => 'datetime',
        'flash_sale_end' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function recentlyViewed(): HasMany
    {
        return $this->hasMany(RecentlyViewed::class);
    }

    public function getCurrentPriceAttribute()
    {
        // Check if flash sale is active
        if ($this->flash_sale_price && $this->flash_sale_start && $this->flash_sale_end) {
            $now = now();
            if ($now >= $this->flash_sale_start && $now <= $this->flash_sale_end) {
                return $this->flash_sale_price;
            }
        }
        return $this->sale_price ?? $this->price;
    }

    public function getDiscountPercentageAttribute()
    {
        if ($this->sale_price || $this->flash_sale_price) {
            $originalPrice = $this->price;
            $currentPrice = $this->current_price;
            return round((($originalPrice - $currentPrice) / $originalPrice) * 100);
        }
        return 0;
    }
}

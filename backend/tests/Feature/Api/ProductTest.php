<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_products(): void
    {
        $category = Category::factory()->create();
        Product::factory()->count(5)->create([
            'category_id' => $category->id,
            'is_active' => true,
        ]);

        $response = $this->getJson('/api/v1/products');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'price',
                    ],
                ],
            ]);
    }

    public function test_can_get_product_details(): void
    {
        $category = Category::factory()->create();
        $product = Product::factory()->create([
            'category_id' => $category->id,
            'is_active' => true,
        ]);

        $response = $this->getJson("/api/v1/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'name',
                'price',
                'category',
            ]);
    }

    public function test_can_get_featured_products(): void
    {
        $category = Category::factory()->create();
        Product::factory()->count(3)->create([
            'category_id' => $category->id,
            'is_active' => true,
            'featured' => true,
        ]);

        $response = $this->getJson('/api/v1/products/featured');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Products",
 *     description="Product endpoints"
 * )
 */
class ProductController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/products",
     *     summary="List all products",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="Filter by category",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="brand_id",
     *         in="query",
     *         description="Filter by brand",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of products"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['category', 'brand', 'images'])
            ->where('is_active', true);

        // Category filter
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Brand filter (single or multiple)
        if ($request->has('brand_id')) {
            $query->where('brand_id', $request->brand_id);
        }
        if ($request->has('brands')) {
            $brands = is_array($request->brands) ? $request->brands : explode(',', $request->brands);
            $query->whereIn('brand_id', $brands);
        }

        // Price range filter
        if ($request->has('min_price')) {
            $query->where(function ($q) use ($request) {
                $q->where('price', '>=', $request->min_price)
                  ->orWhere('sale_price', '>=', $request->min_price)
                  ->orWhere('flash_sale_price', '>=', $request->min_price);
            });
        }
        if ($request->has('max_price')) {
            $query->where(function ($q) use ($request) {
                $q->where('price', '<=', $request->max_price)
                  ->orWhere('sale_price', '<=', $request->max_price)
                  ->orWhere('flash_sale_price', '<=', $request->max_price);
            });
        }

        // Rating filter
        if ($request->has('min_rating')) {
            $query->where('average_rating', '>=', $request->min_rating);
        }

        // Search filter
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'relevance');
        switch ($sortBy) {
            case 'price_asc':
                $query->orderByRaw('COALESCE(flash_sale_price, sale_price, price) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('COALESCE(flash_sale_price, sale_price, price) DESC');
                break;
            case 'rating':
                $query->orderBy('average_rating', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'relevance':
            default:
                $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
                break;
        }

        $products = $query->paginate($request->get('per_page', 20));

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/{id}",
     *     summary="Get product details",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product details"
     *     )
     * )
     */
    public function show($id): JsonResponse
    {
        $product = Product::with(['category', 'brand', 'images', 'reviews.user'])
            ->where('is_active', true)
            ->findOrFail($id);

        return response()->json($product);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/featured",
     *     summary="Get featured products",
     *     tags={"Products"},
     *     @OA\Response(
     *         response=200,
     *         description="List of featured products"
     *     )
     * )
     */
    public function featured(): JsonResponse
    {
        $products = Product::with(['category', 'brand', 'images'])
            ->where('is_active', true)
            ->where('featured', true)
            ->limit(10)
            ->get();

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/search",
     *     summary="Search products",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Search results"
     *     )
     * )
     */
    public function search(Request $request): JsonResponse
    {
        $request->validate(['q' => 'required|string']);

        $query = Product::with(['category', 'brand', 'images'])
            ->where('is_active', true)
            ->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->q . '%')
                  ->orWhere('description', 'like', '%' . $request->q . '%');
            });

        // Apply same filters as index
        if ($request->has('min_price')) {
            $query->where(function ($q) use ($request) {
                $q->where('price', '>=', $request->min_price)
                  ->orWhere('sale_price', '>=', $request->min_price);
            });
        }
        if ($request->has('max_price')) {
            $query->where(function ($q) use ($request) {
                $q->where('price', '<=', $request->max_price)
                  ->orWhere('sale_price', '<=', $request->max_price);
            });
        }
        if ($request->has('brands')) {
            $brands = is_array($request->brands) ? $request->brands : explode(',', $request->brands);
            $query->whereIn('brand_id', $brands);
        }
        if ($request->has('min_rating')) {
            $query->where('average_rating', '>=', $request->min_rating);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'relevance');
        switch ($sortBy) {
            case 'price_asc':
                $query->orderByRaw('COALESCE(flash_sale_price, sale_price, price) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('COALESCE(flash_sale_price, sale_price, price) DESC');
                break;
            case 'rating':
                $query->orderBy('average_rating', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
                break;
        }

        $products = $query->paginate($request->get('per_page', 20));

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/category/{categoryId}",
     *     summary="Get products by category",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="categoryId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Products in category"
     *     )
     * )
     */
    public function byCategory($categoryId): JsonResponse
    {
        $query = Product::with(['category', 'brand', 'images'])
            ->where('is_active', true)
            ->where('category_id', $categoryId);

        // Apply filters
        if (request()->has('min_price')) {
            $query->where('price', '>=', request()->min_price);
        }
        if (request()->has('max_price')) {
            $query->where('price', '<=', request()->max_price);
        }
        if (request()->has('brands')) {
            $brands = is_array(request()->brands) ? request()->brands : explode(',', request()->brands);
            $query->whereIn('brand_id', $brands);
        }
        if (request()->has('min_rating')) {
            $query->where('average_rating', '>=', request()->min_rating);
        }

        // Sorting
        $sortBy = request()->get('sort_by', 'relevance');
        switch ($sortBy) {
            case 'price_asc':
                $query->orderByRaw('COALESCE(flash_sale_price, sale_price, price) ASC');
                break;
            case 'price_desc':
                $query->orderByRaw('COALESCE(flash_sale_price, sale_price, price) DESC');
                break;
            case 'rating':
                $query->orderBy('average_rating', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy('featured', 'desc')->orderBy('created_at', 'desc');
                break;
        }

        $products = $query->paginate(request()->get('per_page', 20));

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/autocomplete",
     *     summary="Get product autocomplete suggestions",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="q",
     *         in="query",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product suggestions"
     *     )
     * )
     */
    public function autocomplete(Request $request): JsonResponse
    {
        $request->validate(['q' => 'required|string|min:2']);

        $products = Product::with(['images'])
            ->where('is_active', true)
            ->where('name', 'like', '%' . $request->q . '%')
            ->select('id', 'name', 'price', 'sale_price', 'flash_sale_price')
            ->limit(10)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->current_price,
                ];
            });

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/flash-sales",
     *     summary="Get flash sale products",
     *     tags={"Products"},
     *     @OA\Response(
     *         response=200,
     *         description="List of flash sale products"
     *     )
     * )
     */
    public function flashSales(): JsonResponse
    {
        $now = now();
        $products = Product::with(['category', 'brand', 'images'])
            ->where('is_active', true)
            ->whereNotNull('flash_sale_start')
            ->whereNotNull('flash_sale_end')
            ->where('flash_sale_start', '<=', $now)
            ->where('flash_sale_end', '>=', $now)
            ->orderBy('flash_sale_end', 'asc')
            ->limit(20)
            ->get();

        return response()->json($products);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/daily-deals",
     *     summary="Get daily deals",
     *     tags={"Products"},
     *     @OA\Response(
     *         response=200,
     *         description="List of daily deal products"
     *     )
     * )
     */
    public function dailyDeals(): JsonResponse
    {
        $products = Product::with(['category', 'brand', 'images'])
            ->where('is_active', true)
            ->where(function ($query) {
                $query->whereNotNull('sale_price')
                      ->orWhereNotNull('flash_sale_price');
            })
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        return response()->json($products);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/products/compare",
     *     summary="Compare products",
     *     tags={"Products"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_ids"},
     *             @OA\Property(property="product_ids", type="array", @OA\Items(type="integer"), example={1,2,3})
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Product comparison data"
     *     )
     * )
     */
    public function compare(Request $request): JsonResponse
    {
        $request->validate([
            'product_ids' => 'required|array|min:2|max:5',
            'product_ids.*' => 'exists:products,id',
        ]);

        $products = Product::with(['category', 'brand', 'images', 'reviews'])
            ->whereIn('id', $request->product_ids)
            ->where('is_active', true)
            ->get();

        $comparison = [
            'products' => $products,
            'attributes' => [
                'Price' => $products->pluck('current_price')->toArray(),
                'Rating' => $products->pluck('average_rating')->toArray(),
                'Reviews' => $products->pluck('review_count')->toArray(),
                'Brand' => $products->pluck('brand.name')->toArray(),
                'Stock' => $products->pluck('stock_quantity')->toArray(),
            ],
        ];

        return response()->json($comparison);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/products/{id}/view",
     *     summary="Track product view",
     *     tags={"Products"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="View tracked"
     *     )
     * )
     */
    public function trackView(Request $request, $id): JsonResponse
    {
        $product = Product::findOrFail($id);

        if ($request->user()) {
            \App\Models\RecentlyViewed::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'product_id' => $product->id,
                ],
                ['viewed_at' => now()]
            );
        }

        return response()->json(['message' => 'View tracked']);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/products/recently-viewed",
     *     summary="Get recently viewed products",
     *     tags={"Products"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of recently viewed products"
     *     )
     * )
     */
    public function recentlyViewed(Request $request): JsonResponse
    {
        $recentlyViewed = \App\Models\RecentlyViewed::with('product.images')
            ->where('user_id', $request->user()->id)
            ->orderBy('viewed_at', 'desc')
            ->limit(10)
            ->get()
            ->pluck('product')
            ->filter();

        return response()->json($recentlyViewed->values());
    }
}

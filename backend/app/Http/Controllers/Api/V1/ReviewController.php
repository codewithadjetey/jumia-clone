<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CreateReviewRequest;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Reviews",
 *     description="Product review endpoints"
 * )
 */
class ReviewController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/reviews/product/{productId}",
     *     summary="Get product reviews",
     *     tags={"Reviews"},
     *     @OA\Parameter(
     *         name="productId",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of product reviews"
     *     )
     * )
     */
    public function getProductReviews(Request $request, $productId): JsonResponse
    {
        $query = Review::with('user')
            ->where('product_id', $productId)
            ->where('is_approved', true);

        // Filter by rating
        if ($request->has('rating')) {
            $query->where('rating', '>=', $request->rating);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'recent');
        switch ($sortBy) {
            case 'oldest':
                $query->oldest();
                break;
            case 'highest':
                $query->orderBy('rating', 'desc');
                break;
            case 'lowest':
                $query->orderBy('rating', 'asc');
                break;
            case 'recent':
            default:
                $query->latest();
                break;
        }

        $reviews = $query->paginate(20);

        return response()->json($reviews);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/reviews",
     *     summary="Create review",
     *     tags={"Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"product_id","rating"},
     *             @OA\Property(property="product_id", type="integer", example=1),
     *             @OA\Property(property="rating", type="integer", minimum=1, maximum=5, example=5),
     *             @OA\Property(property="comment", type="string", example="Great product!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Review created successfully"
     *     )
     * )
     */
    public function store(CreateReviewRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $review = Review::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        // Update product rating aggregation
        $this->updateProductRating($review->product_id);

        return response()->json($review->load('user'), 201);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/reviews/{id}",
     *     summary="Update review",
     *     tags={"Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="rating", type="integer", minimum=1, maximum=5),
     *             @OA\Property(property="comment", type="string")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Review updated successfully"
     *     )
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $review = Review::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string',
        ]);

        $review->update($validated);

        // Update product rating aggregation
        $this->updateProductRating($review->product_id);

        return response()->json($review->load('user'));
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/reviews/{id}",
     *     summary="Delete review",
     *     tags={"Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Review deleted successfully"
     *     )
     * )
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        $review = Review::where('user_id', $request->user()->id)
            ->findOrFail($id);
        
        $productId = $review->product_id;
        $review->delete();

        // Update product rating aggregation
        $this->updateProductRating($productId);

        return response()->json(['message' => 'Review deleted']);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/reviews/{id}/helpful",
     *     summary="Mark review as helpful",
     *     tags={"Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Review marked as helpful"
     *     )
     * )
     */
    public function markHelpful(Request $request, $id): JsonResponse
    {
        $review = Review::findOrFail($id);

        $vote = \App\Models\ReviewHelpfulVote::firstOrCreate([
            'review_id' => $review->id,
            'user_id' => $request->user()->id,
        ]);

        if ($vote->wasRecentlyCreated) {
            $review->increment('helpful_count');
        }

        return response()->json([
            'message' => 'Review marked as helpful',
            'helpful_count' => $review->fresh()->helpful_count,
        ]);
    }

    private function updateProductRating($productId): void
    {
        $product = \App\Models\Product::find($productId);
        if (!$product) {
            return;
        }

        $approvedReviews = Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->get();

        $averageRating = $approvedReviews->avg('rating') ?? 0;
        $reviewCount = $approvedReviews->count();

        $product->update([
            'average_rating' => round($averageRating, 2),
            'review_count' => $reviewCount,
        ]);
    }
}

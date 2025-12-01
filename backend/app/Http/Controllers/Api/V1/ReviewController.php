<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function getProductReviews($productId): JsonResponse
    {
        $reviews = Review::with('user')
            ->where('product_id', $productId)
            ->where('is_approved', true)
            ->latest()
            ->paginate(20);

        return response()->json($reviews);
    }

    public function store(CreateReviewRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $review = Review::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return response()->json($review->load('user'), 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $review = Review::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'rating' => 'sometimes|integer|min:1|max:5',
            'comment' => 'sometimes|string',
        ]);

        $review->update($validated);

        return response()->json($review->load('user'));
    }

    public function destroy(Request $request, $id): JsonResponse
    {
        Review::where('user_id', $request->user()->id)
            ->findOrFail($id)
            ->delete();

        return response()->json(['message' => 'Review deleted']);
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(): JsonResponse
    {
        $reviews = Review::with(['user', 'product'])->latest()->paginate(20);
        return response()->json($reviews);
    }

    public function approve($id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->update(['is_approved' => true]);
        return response()->json($review);
    }

    public function reject($id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->update(['is_approved' => false]);
        return response()->json($review);
    }

    public function destroy($id): JsonResponse
    {
        Review::findOrFail($id)->delete();
        return response()->json(['message' => 'Review deleted']);
    }
}

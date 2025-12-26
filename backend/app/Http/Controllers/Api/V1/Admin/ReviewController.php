<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Admin - Reviews",
 *     description="Admin review moderation endpoints"
 * )
 */
class ReviewController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/reviews",
     *     summary="List all reviews (Admin)",
     *     tags={"Admin - Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="List of reviews")
     * )
     */
    public function index(): JsonResponse
    {
        $reviews = Review::with(['user', 'product'])->latest()->paginate(20);
        return response()->json($reviews);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/reviews/{id}/approve",
     *     summary="Approve review (Admin)",
     *     tags={"Admin - Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Review approved successfully")
     * )
     */
    public function approve($id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->update(['is_approved' => true]);
        return response()->json($review);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/reviews/{id}/reject",
     *     summary="Reject review (Admin)",
     *     tags={"Admin - Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Review rejected successfully")
     * )
     */
    public function reject($id): JsonResponse
    {
        $review = Review::findOrFail($id);
        $review->update(['is_approved' => false]);
        return response()->json($review);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/reviews/{id}",
     *     summary="Delete review (Admin)",
     *     tags={"Admin - Reviews"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="Review deleted successfully")
     * )
     */
    public function destroy($id): JsonResponse
    {
        Review::findOrFail($id)->delete();
        return response()->json(['message' => 'Review deleted']);
    }
}

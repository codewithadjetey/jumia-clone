<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Newsletter",
 *     description="Newsletter subscription endpoints"
 * )
 */
class NewsletterController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/newsletter/subscribe",
     *     summary="Subscribe to newsletter",
     *     tags={"Newsletter"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully subscribed"
     *     )
     * )
     */
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subscription = NewsletterSubscription::updateOrCreate(
            ['email' => $request->email],
            [
                'is_active' => true,
                'subscribed_at' => now(),
                'unsubscribed_at' => null,
            ]
        );

        return response()->json([
            'message' => 'Successfully subscribed to newsletter',
            'subscription' => $subscription,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/newsletter/unsubscribe",
     *     summary="Unsubscribe from newsletter",
     *     tags={"Newsletter"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successfully unsubscribed"
     *     )
     * )
     */
    public function unsubscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $subscription = NewsletterSubscription::where('email', $request->email)->first();

        if ($subscription) {
            $subscription->update([
                'is_active' => false,
                'unsubscribed_at' => now(),
            ]);
        }

        return response()->json(['message' => 'Successfully unsubscribed from newsletter']);
    }
}





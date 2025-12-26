<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CreateAddressRequest;
use App\Models\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Addresses",
 *     description="Address management endpoints"
 * )
 */
class AddressController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/addresses",
     *     summary="Get user's addresses",
     *     tags={"Addresses"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of addresses"
     *     )
     * )
     */
    public function index(Request $request): JsonResponse
    {
        $addresses = Address::where('user_id', $request->user()->id)->get();

        return response()->json($addresses);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/addresses",
     *     summary="Create new address",
     *     tags={"Addresses"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"type","street","city","state","country","postal_code"},
     *             @OA\Property(property="type", type="string", enum={"shipping","billing"}, example="shipping"),
     *             @OA\Property(property="street", type="string", example="123 Main St"),
     *             @OA\Property(property="city", type="string", example="New York"),
     *             @OA\Property(property="state", type="string", example="NY"),
     *             @OA\Property(property="country", type="string", example="USA"),
     *             @OA\Property(property="postal_code", type="string", example="10001"),
     *             @OA\Property(property="is_default", type="boolean", example=false)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Address created successfully"
     *     )
     * )
     */
    public function store(CreateAddressRequest $request): JsonResponse
    {
        $validated = $request->validated();

        if ($validated['is_default'] ?? false) {
            Address::where('user_id', $request->user()->id)
                ->update(['is_default' => false]);
        }

        $address = Address::create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return response()->json($address, 201);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/addresses/{id}",
     *     summary="Update address",
     *     tags={"Addresses"},
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
     *             @OA\Property(property="type", type="string", enum={"shipping","billing"}),
     *             @OA\Property(property="street", type="string"),
     *             @OA\Property(property="city", type="string"),
     *             @OA\Property(property="state", type="string"),
     *             @OA\Property(property="country", type="string"),
     *             @OA\Property(property="postal_code", type="string"),
     *             @OA\Property(property="is_default", type="boolean")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Address updated successfully"
     *     )
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $address = Address::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'type' => 'sometimes|in:shipping,billing',
            'street' => 'sometimes|string',
            'city' => 'sometimes|string',
            'state' => 'sometimes|string',
            'country' => 'sometimes|string',
            'postal_code' => 'sometimes|string',
            'is_default' => 'boolean',
        ]);

        if ($validated['is_default'] ?? false) {
            Address::where('user_id', $request->user()->id)
                ->where('id', '!=', $id)
                ->update(['is_default' => false]);
        }

        $address->update($validated);

        return response()->json($address);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/addresses/{id}",
     *     summary="Delete address",
     *     tags={"Addresses"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Address deleted successfully"
     *     )
     * )
     */
    public function destroy(Request $request, $id): JsonResponse
    {
        Address::where('user_id', $request->user()->id)
            ->findOrFail($id)
            ->delete();

        return response()->json(['message' => 'Address deleted']);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/addresses/{id}/set-default",
     *     summary="Set default address",
     *     tags={"Addresses"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Default address set successfully"
     *     )
     * )
     */
    public function setDefault(Request $request, $id): JsonResponse
    {
        Address::where('user_id', $request->user()->id)
            ->update(['is_default' => false]);

        $address = Address::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $address->update(['is_default' => true]);

        return response()->json($address);
    }
}

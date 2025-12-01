<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Admin - Users",
 *     description="Admin user management endpoints"
 * )
 */
class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/admin/users",
     *     summary="List all users (Admin)",
     *     tags={"Admin - Users"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(response=200, description="List of users")
     * )
     */
    public function index(): JsonResponse
    {
        $users = User::with('roles')->paginate(20);
        return response()->json($users);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/admin/users/{id}",
     *     summary="Get user details (Admin)",
     *     tags={"Admin - Users"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="User details")
     * )
     */
    public function show($id): JsonResponse
    {
        $user = User::with('roles')->findOrFail($id);
        return response()->json($user);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/admin/users/{id}",
     *     summary="Update user (Admin)",
     *     tags={"Admin - Users"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string"),
     *             @OA\Property(property="email", type="string", format="email"),
     *             @OA\Property(property="phone", type="string")
     *         )
     *     ),
     *     @OA\Response(response=200, description="User updated successfully")
     * )
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => 'nullable|string',
        ]);

        $user->update($validated);
        return response()->json($user);
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/admin/users/{id}",
     *     summary="Delete user (Admin)",
     *     tags={"Admin - Users"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
     *     @OA\Response(response=200, description="User deleted successfully")
     * )
     */
    public function destroy($id): JsonResponse
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'User deleted']);
    }
}

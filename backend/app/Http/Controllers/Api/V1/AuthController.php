<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\LoginRequest;
use App\Http\Requests\Api\V1\RegisterRequest;
use App\Http\Requests\Api\V1\UpdateProfileRequest;
use App\Http\Resources\Api\V1\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Tag(
 *     name="Authentication",
 *     description="User authentication endpoints"
 * )
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/v1/auth/register",
     *     summary="Register a new user",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *             @OA\Property(property="phone", type="string", example="+1234567890")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="User registered successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="User registered successfully"),
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="token", type="string", example="1|xxxxxxxxxxxx")
     *         )
     *     )
     * )
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($user),
            'token' => $token,
        ], 201);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/login",
     *     summary="Login user",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Login successful"),
     *             @OA\Property(property="user", type="object"),
     *             @OA\Property(property="token", type="string", example="1|xxxxxxxxxxxx")
     *         )
     *     )
     * )
     */
    public function login(LoginRequest $request): JsonResponse
    {

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/logout",
     *     summary="Logout user",
     *     tags={"Authentication"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="Logout successful"
     *     )
     * )
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful',
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/auth/me",
     *     summary="Get authenticated user",
     *     tags={"Authentication"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="User information",
     *         @OA\JsonContent(
     *             @OA\Property(property="user", type="object")
     *         )
     *     )
     * )
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new UserResource($request->user()),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/api/v1/auth/profile",
     *     summary="Update user profile",
     *     tags={"Authentication"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="John Doe"),
     *             @OA\Property(property="phone", type="string", example="+1234567890"),
     *             @OA\Property(property="avatar", type="string", example="path/to/avatar.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile updated successfully"
     *     )
     * )
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $request->user()->update($request->validated());

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => new UserResource($request->user()->fresh()),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/forgot-password",
     *     summary="Request password reset",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email"},
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset link sent"
     *     )
     * )
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return response()->json([
            'message' => 'If the email exists, a password reset link has been sent.',
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/reset-password",
     *     summary="Reset password",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"token","email","password"},
     *             @OA\Property(property="token", type="string", example="reset-token"),
     *             @OA\Property(property="email", type="string", format="email", example="john@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="newpassword123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="newpassword123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Password reset successful"
     *     )
     * )
     */
    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Password reset successfully',
            ]);
        }

        return response()->json([
            'message' => 'Unable to reset password',
        ], 400);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/google",
     *     summary="Login/Register with Google",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"access_token"},
     *             @OA\Property(property="access_token", type="string", example="google-access-token")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful"
     *     )
     * )
     */
    public function google(Request $request): JsonResponse
    {
        $request->validate([
            'access_token' => 'required|string',
        ]);

        // Note: This requires Laravel Socialite package
        // Install with: composer require laravel/socialite
        // Configure in config/services.php
        
        try {
            // For now, return a placeholder response
            // In production, use Socialite to verify the token and get user info
            return response()->json([
                'message' => 'Google authentication requires Laravel Socialite package',
                'note' => 'Install: composer require laravel/socialite',
            ], 501);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Authentication failed',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * @OA\Post(
     *     path="/api/v1/auth/facebook",
     *     summary="Login/Register with Facebook",
     *     tags={"Authentication"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"access_token"},
     *             @OA\Property(property="access_token", type="string", example="facebook-access-token")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Login successful"
     *     )
     * )
     */
    public function facebook(Request $request): JsonResponse
    {
        $request->validate([
            'access_token' => 'required|string',
        ]);

        // Note: This requires Laravel Socialite package
        // Install with: composer require laravel/socialite
        // Configure in config/services.php
        
        try {
            // For now, return a placeholder response
            // In production, use Socialite to verify the token and get user info
            return response()->json([
                'message' => 'Facebook authentication requires Laravel Socialite package',
                'note' => 'Install: composer require laravel/socialite',
            ], 501);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Authentication failed',
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * @OA\Info(
 *     title="Jumia E-commerce API",
 *     version="1.0.0",
 *     description="API documentation for Jumia E-commerce Platform"
 * )
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="API Server"
 * )
 * @OA\SecurityScheme(
 *     securityScheme="sanctum",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class SystemController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/health",
     *     summary="Health check endpoint",
     *     tags={"System"},
     *     @OA\Response(
     *         response=200,
     *         description="Service is healthy",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="ok"),
     *             @OA\Property(property="timestamp", type="string", example="2024-01-01T00:00:00Z")
     *         )
     *     )
     * )
     */
    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/system/info",
     *     summary="Get system information",
     *     tags={"System"},
     *     @OA\Response(
     *         response=200,
     *         description="System information",
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", example="Jumia E-commerce API"),
     *             @OA\Property(property="version", type="string", example="v1"),
     *             @OA\Property(property="environment", type="string", example="local"),
     *             @OA\Property(property="meta", type="object",
     *                 @OA\Property(property="api_version", type="string", example="v1"),
     *                 @OA\Property(property="laravel_version", type="string", example="12.0.0")
     *             )
     *         )
     *     )
     * )
     */
    public function info(): JsonResponse
    {
        return response()->json([
            'name' => 'Jumia E-commerce API',
            'version' => config('api.version', 'v1'),
            'environment' => app()->environment(),
            'meta' => [
                'api_version' => config('api.version', 'v1'),
                'laravel_version' => app()->version(),
            ],
        ]);
    }
}

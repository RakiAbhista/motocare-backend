<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Get all services with pagination
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);

        try {
            $services = Service::paginate($limit, ['*'], 'page', $page);

            return response()->json([
                'status' => 'success',
                'data' => $services->items(),
                'meta' => [
                    'current_page' => $services->currentPage(),
                    'total' => $services->total(),
                    'per_page' => $services->perPage(),
                    'last_page' => $services->lastPage(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch services',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create new service
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'sometimes|string|max:100',
            'base_price' => 'sometimes|numeric|min:0',
        ]);

        try {
            // Map 'price' ke 'base_price' untuk model
            if (isset($validated['price'])) {
                $validated['base_price'] = $validated['price'];
                unset($validated['price']);
            }

            $service = Service::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Service created successfully',
                'data' => $service,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update service
     */
    public function update(Request $request, $serviceId)
    {
        $validated = $request->validate([
            'service_name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric|min:0',
            'duration' => 'sometimes|string|max:100',
            'base_price' => 'sometimes|numeric|min:0',
        ]);

        try {
            $service = Service::findOrFail($serviceId);
            
            // Map 'price' ke 'base_price' untuk model
            if (isset($validated['price'])) {
                $validated['base_price'] = $validated['price'];
                unset($validated['price']);
            }
            
            $service->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Service updated successfully',
                'data' => $service,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete service
     */
    public function destroy($serviceId)
    {
        try {
            $service = Service::findOrFail($serviceId);
            $service->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Service deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

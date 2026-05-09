<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Workshop;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class WorkshopController extends Controller
{
    /**
     * Get all workshops with pagination
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);

        try {
            $workshops = Workshop::paginate($limit, ['*'], 'page', $page);

            return response()->json([
                'status' => 'success',
                'data' => $workshops->items(),
                'meta' => [
                    'current_page' => $workshops->currentPage(),
                    'total' => $workshops->total(),
                    'per_page' => $workshops->perPage(),
                    'last_page' => $workshops->lastPage(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch workshops',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create new workshop
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'phone' => 'required|string|max:20',
            'city' => 'required|string|max:100',
            'latitude' => 'sometimes|numeric|between:-90,90',
            'longitude' => 'sometimes|numeric|between:-180,180',
        ]);

        try {
            $workshop = Workshop::create($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Workshop created successfully',
                'data' => $workshop,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create workshop',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update workshop
     */
    public function update(Request $request, $workshopId)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string',
            'phone' => 'sometimes|string|max:20',
            'city' => 'sometimes|string|max:100',
            'latitude' => 'sometimes|numeric|between:-90,90',
            'longitude' => 'sometimes|numeric|between:-180,180',
        ]);

        try {
            $workshop = Workshop::findOrFail($workshopId);
            $workshop->update($validated);

            return response()->json([
                'status' => 'success',
                'message' => 'Workshop updated successfully',
                'data' => $workshop,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update workshop',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete workshop
     */
    public function destroy($workshopId)
    {
        try {
            $workshop = Workshop::findOrFail($workshopId);
            $workshop->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Workshop deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete workshop',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

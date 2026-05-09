<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Vehicle;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Get all vehicles with pagination
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);

        try {
            $vehicles = Vehicle::paginate($limit, ['*'], 'page', $page);

            return response()->json([
                'status' => 'success',
                'data' => $vehicles->items(),
                'meta' => [
                    'current_page' => $vehicles->currentPage(),
                    'total' => $vehicles->total(),
                    'per_page' => $vehicles->perPage(),
                    'last_page' => $vehicles->lastPage(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch vehicles',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get vehicle detail by ID
     */
    public function show($vehicleId)
    {
        try {
            $vehicle = Vehicle::findOrFail($vehicleId);

            return response()->json([
                'status' => 'success',
                'data' => $vehicle,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch vehicle',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

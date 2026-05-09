<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Get all orders with pagination
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);

        try {
            $orders = Order::with(['orderDetails', 'mechanic', 'voucher'])
                ->paginate($limit, ['*'], 'page', $page);

            // Transform data untuk frontend
            $formattedOrders = $orders->items();
            $formattedOrders = array_map(function ($order) {
                return [
                    'id' => $order->id,
                    'customer' => $order->mechanic?->name ?? 'N/A',
                    'total_price' => $order->total_price,
                    'status' => $order->status,
                    'payment_status' => $order->payment_status,
                    'payment_type' => $order->payment_type,
                    'scheduled_at' => $order->scheduled_at,
                    'mechanic_id' => $order->mechanic_id,
                    'voucher_id' => $order->voucher_id,
                    'transaction_id' => $order->transaction_id,
                    'order_details' => $order->orderDetails,
                    'created_at' => $order->created_at,
                    'updated_at' => $order->updated_at,
                ];
            }, $formattedOrders);

            return response()->json([
                'status' => 'success',
                'data' => $formattedOrders,
                'meta' => [
                    'current_page' => $orders->currentPage(),
                    'total' => $orders->total(),
                    'per_page' => $orders->perPage(),
                    'last_page' => $orders->lastPage(),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch orders',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get order detail by ID
     */
    public function show($orderId)
    {
        try {
            $order = Order::with(['orderDetails', 'mechanic', 'voucher'])
                ->findOrFail($orderId);

            $formattedOrder = [
                'id' => $order->id,
                'customer' => $order->mechanic?->name ?? 'N/A',
                'total_price' => $order->total_price,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'payment_type' => $order->payment_type,
                'scheduled_at' => $order->scheduled_at,
                'mechanic_id' => $order->mechanic_id,
                'voucher_id' => $order->voucher_id,
                'transaction_id' => $order->transaction_id,
                'order_details' => $order->orderDetails,
                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
            ];

            return response()->json([
                'status' => 'success',
                'data' => $formattedOrder,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Order;
// use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $today = Carbon::today();
        
        $stats = [
            'total_user' => User::where('role', 'customer')->count(),
            'total_mechanic' => User::where('role', 'mechanic')->count(),
            'order_today' => Order::whereDate('created_at', $today)->count(),
            'order_completed_today' => Order::whereDate('created_at', $today)
                                        ->where('status', 'completed')->count(),
        ];

        $range = $request->query('range', '1_month'); // default 1 bulan
        $startDate = match($range) {
            '1_week' => Carbon::now()->subWeek(),
            '3_months' => Carbon::now()->subMonths(3),
            '6_months' => Carbon::now()->subMonths(6),
            '1_year' => Carbon::now()->subYear(),
            default => Carbon::now()->subMonth(),
        };

        $orderStats = Order::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as total'),
                DB::raw("SUM(CASE WHEN payment_type = 'Emergency' THEN 1 ELSE 0 END) as emergency"),
                DB::raw("SUM(CASE WHEN payment_type != 'Emergency' OR payment_type IS NULL THEN 1 ELSE 0 END) as normal")
            )
            ->where('created_at', '>=', $startDate)
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->get();

        $topServices = DB::table('order_details')
            ->join('bookings', function($join) {
                $join->on('order_details.reference_id', '=', 'bookings.id')
                     ->where('order_details.order_type', '=', 'booking');
            })
            ->join('services', 'bookings.service_id', '=', 'services.id')
            ->select('services.service_name', DB::raw('count(*) as total'))
            ->groupBy('services.service_name')
            ->orderBy('total', 'desc')
            ->limit(5)
            ->get();

        // 4. AKTIVITAS TERBARU
        $recentActivities = collect();
        
        // Pembuatan akun terbaru
        $newUsers = User::latest()->limit(3)->get()->map(function($u) {
            return ['type' => 'User Baru', 'desc' => "Akun {$u->name} telah dibuat", 'time' => $u->created_at->diffForHumans()];
        });

        // Pembayaran masuk
        $newPayments = Order::where('payment_status', 'paid')->latest()->limit(3)->get()->map(function($o) {
            return ['type' => 'Pembayaran', 'desc' => "Pembayaran Order #{$o->id} Berhasil", 'time' => $o->updated_at->diffForHumans()];
        });

        $recentActivities = $newUsers->concat($newPayments)->sortByDesc('time')->values()->take(5);

        // 5. ORDER TERBARU (Table)
        $recentOrders = Order::with(['mechanic']) // Asumsi ada relasi mechanic di Model Order
            ->latest()
            ->limit(10)
            ->get()
            ->map(function($order) {
                return [
                    'id' => "#MC-{$order->id}",
                    'customer' => $order->user->name ?? 'Guest', // Asumsi ada relasi user
                    'type' => $order->payment_type ?? 'Normal',
                    'status' => ucfirst($order->status),
                    'total' => $order->total_price
                ];
            });

        return response()->json([
            'status' => 'success',
            'data' => [
                'statistics' => $stats,
                'chart_data' => $orderStats,
                'top_services' => $topServices,
                'activities' => $recentActivities,
                'recent_orders' => $recentOrders
            ]
        ]);
    }
}
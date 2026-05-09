import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import StatCard from '../../Components/Admin/StatCard';
import OrderChart from '../../Components/Admin/OrderChart';
import TopServices from '../../Components/Admin/TopServices';
import RecentActivities from '../../Components/Admin/RecentActivities';
import RecentOrders from '../../Components/Admin/RecentOrders';
import { Users, Wrench, TrendingUp, CheckCircle } from 'lucide-react';
import { useDashboardData } from '../../hooks/useDashboardData';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('1_month');
  const { data, loading, error } = useDashboardData(timeRange);

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium">Terjadi kesalahan: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  const { statistics, chart_data, top_services, activities, recent_orders } = data;

  return (
    <AdminLayout title="Dashboard">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Pengguna"
          value={statistics.total_user}
          color="primary"
        />
        <StatCard
          icon={Wrench}
          title="Total Mekanik"
          value={statistics.total_mechanic}
          color="secondary"
        />
        <StatCard
          icon={TrendingUp}
          title="Order Hari Ini"
          value={statistics.order_today}
          color="warning"
        />
        <StatCard
          icon={CheckCircle}
          title="Order Selesai"
          value={statistics.order_completed_today}
          color="success"
        />
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart - Takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <OrderChart data={chart_data} />
        </div>

        {/* Activities - Takes 1 column on desktop */}
        <RecentActivities activities={activities} />
      </div>

      {/* Services and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopServices data={top_services} />
        <RecentOrders orders={recent_orders} />
      </div>
    </AdminLayout>
  );
}

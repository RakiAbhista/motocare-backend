import React from 'react';
import { ShoppingCart, ChevronRight } from 'lucide-react';

export default function RecentOrders({ orders = [] }) {
  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed':
      case 'selesai':
        return 'bg-green-100 text-green-700';
      case 'pending':
      case 'menunggu':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
      case 'dibatalkan':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const displayOrders = orders.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Order Terbaru</h3>
          <p className="text-sm text-gray-500 mt-1">3 Order masuk terakhir</p>
        </div>
        <ShoppingCart className="w-5 h-5 text-gray-400" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Pelanggan
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Tipe
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-700">{order.customer}</td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-600 capitalize">
                      {order.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-semibold text-gray-900">
                      Rp {parseFloat(order.total).toLocaleString('id-ID')}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-20" />
                  <p>Tidak ada order</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View All Link */}
      {displayOrders.length > 0 && (
        <div className="mt-4 flex justify-center">
          <a
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium transition"
          >
            Lihat Semua Order
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}

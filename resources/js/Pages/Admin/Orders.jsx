import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useOrdersData } from '../../hooks/useDashboardData';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Eye,
} from 'lucide-react';

export default function Orders() {
  const [page, setPage] = useState(1);
  const { orders, loading, error, pagination, refetch } = useOrdersData(page, 10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(
    (order) =>
      order.id?.toString().includes(searchTerm) ||
      order.customer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      case 'processing':
      case 'diproses':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Orders">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Orders">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daftar Order</h2>
          <p className="text-gray-600 mt-1">Total: {pagination.total} order</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari berdasarkan ID order atau nama pelanggan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Tipe
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status Pembayaran
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status Order
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600 capitalize">
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.payment_status?.toLowerCase() === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.payment_status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-gray-900">
                        Rp {parseFloat(order.total || 0).toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 text-primary hover:bg-primary-light rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Halaman {pagination.current_page} dari {Math.ceil(pagination.total / pagination.per_page)}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              setPage(Math.min(Math.ceil(pagination.total / pagination.per_page), page + 1))
            }
            disabled={page >= Math.ceil(pagination.total / pagination.per_page)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-gray-900">Detail Order</h3>
            </div>

            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">ORDER ID</p>
                <p className="text-gray-900 font-bold text-lg">{selectedOrder.id}</p>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">PELANGGAN</p>
                  <p className="text-gray-900">{selectedOrder.customer || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">TIPE</p>
                  <p className="text-gray-900 capitalize">{selectedOrder.type || '-'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">STATUS PEMBAYARAN</p>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
                      selectedOrder.payment_status?.toLowerCase() === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {selectedOrder.payment_status || 'N/A'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">STATUS ORDER</p>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">TOTAL</p>
                <p className="text-gray-900 font-bold text-xl">
                  Rp {parseFloat(selectedOrder.total || 0).toLocaleString('id-ID')}
                </p>
              </div>

              {selectedOrder.created_at && (
                <>
                  <hr className="border-gray-200" />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">DIBUAT PADA</p>
                    <p className="text-gray-900">
                      {new Date(selectedOrder.created_at).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </>
              )}

              {selectedOrder.updated_at && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">DIPERBARUI PADA</p>
                  <p className="text-gray-900">
                    {new Date(selectedOrder.updated_at).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

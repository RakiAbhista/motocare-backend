import React, { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { useVehiclesData } from '../../hooks/useDashboardData';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Car,
  Eye,
} from 'lucide-react';

export default function Vehicles() {
  const [page, setPage] = useState(1);
  const { vehicles, loading, error, pagination, refetch } = useVehiclesData(page, 10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.plate_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <AdminLayout title="Manajemen Vehicles">
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
    <AdminLayout title="Manajemen Vehicles">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Daftar Kendaraan</h2>
          <p className="text-gray-600 mt-1">Total: {pagination.total} kendaraan</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari berdasarkan nomor plat, model, atau pemilik..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-primary to-secondary p-4 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Nomor Plat</p>
                      <p className="font-bold text-lg">{vehicle.plate_number}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">MODEL</p>
                  <p className="text-gray-900 font-semibold">{vehicle.model || '-'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">MERK</p>
                    <p className="text-gray-900">{vehicle.brand || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">TAHUN</p>
                    <p className="text-gray-900">{vehicle.year || '-'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">PEMILIK</p>
                  <p className="text-gray-900">{vehicle.owner_name || '-'}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">TIPE KENDARAAN</p>
                  <p className="text-gray-900 capitalize">{vehicle.vehicle_type || '-'}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">NOMOR MESIN</p>
                  <p className="text-gray-900 text-sm wrap-break-word">{vehicle.engine_number || '-'}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="w-full flex items-center justify-center gap-2 text-primary hover:bg-primary-light py-2 rounded-lg transition font-medium"
                >
                  <Eye className="w-4 h-4" />
                  Detail
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
            <Car className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600 font-medium">Tidak ada data kendaraan</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
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
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center gap-3">
              <Car className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold text-gray-900">Detail Kendaraan</h3>
            </div>

            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">NOMOR PLAT</p>
                <p className="text-gray-900 font-bold text-lg">{selectedVehicle.plate_number}</p>
              </div>

              <hr className="border-gray-200" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">MERK</p>
                  <p className="text-gray-900">{selectedVehicle.brand || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">MODEL</p>
                  <p className="text-gray-900">{selectedVehicle.model || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">TAHUN</p>
                  <p className="text-gray-900">{selectedVehicle.year || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold mb-1">TIPE</p>
                  <p className="text-gray-900 capitalize">{selectedVehicle.vehicle_type || '-'}</p>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">PEMILIK</p>
                <p className="text-gray-900">{selectedVehicle.owner_name || '-'}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">NOMOR MESIN</p>
                <p className="text-gray-900 wrap-break-word">{selectedVehicle.engine_number || '-'}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1">NOMOR RANGKA</p>
                <p className="text-gray-900 wrap-break-word">{selectedVehicle.chassis_number || '-'}</p>
              </div>

              {selectedVehicle.created_at && (
                <>
                  <hr className="border-gray-200" />
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">TERDAFTAR PADA</p>
                    <p className="text-gray-900">
                      {new Date(selectedVehicle.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedVehicle(null)}
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

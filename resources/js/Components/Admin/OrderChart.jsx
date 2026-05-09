import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Filter } from 'lucide-react';

export default function OrderChart({ data = [] }) {
  const [timeRange, setTimeRange] = useState('1_month');
  const [typeFilter, setTypeFilter] = useState('all');

  const timeRanges = [
    { value: '1_week', label: '1 Minggu' },
    { value: '1_month', label: '1 Bulan' },
    { value: '3_months', label: '3 Bulan' },
    { value: '6_months', label: '6 Bulan' },
    { value: '1_year', label: '1 Tahun' },
  ];

  const filteredData = useMemo(() => {
    if (typeFilter === 'all') {
      return data.map((item) => ({
        date: new Date(item.date).toLocaleDateString('id-ID', {
          month: 'short',
          day: 'numeric',
        }),
        total: item.total,
        emergency: item.emergency || 0,
        normal: item.normal || 0,
      }));
    }

    return data.map((item) => ({
      date: new Date(item.date).toLocaleDateString('id-ID', {
        month: 'short',
        day: 'numeric',
      }),
      total: typeFilter === 'emergency' ? item.emergency : item.normal,
    }));
  }, [data, typeFilter]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Statistik Order</h3>
          <p className="text-sm text-gray-500 mt-1">Tren order berdasarkan waktu</p>
        </div>
        <Filter className="w-5 h-5 text-gray-400" />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rentang Waktu
          </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipe Order
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
          >
            <option value="all">Semua</option>
            <option value="emergency">Emergency</option>
            <option value="normal">Normal</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              cursor={{ stroke: '#3564C4', strokeWidth: 2 }}
            />
            {typeFilter === 'all' ? (
              <>
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emergency"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Emergency"
                />
                <Line
                  type="monotone"
                  dataKey="normal"
                  stroke="#3564C4"
                  strokeWidth={2}
                  dot={{ fill: '#3564C4', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Normal"
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3564C4"
                  strokeWidth={2}
                  dot={{ fill: '#3564C4', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

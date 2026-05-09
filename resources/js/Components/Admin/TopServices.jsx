import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function TopServices({ data = [] }) {
  const chartData = data.slice(0, 5).map((service) => ({
    name: service.service_name.substring(0, 12),
    fullName: service.service_name,
    total: service.total,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Layanan Teratas</h3>
          <p className="text-sm text-gray-500 mt-1">5 Layanan paling sering digunakan</p>
        </div>
        <TrendingUp className="w-5 h-5 text-secondary" />
      </div>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'rgba(53, 100, 196, 0.1)' }}
              formatter={(value, name, props) => [
                value,
                `${props.payload.fullName} (${value} order)`,
              ]}
            />
            <Bar
              dataKey="total"
              fill="#3564C4"
              radius={[8, 8, 0, 0]}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* List View */}
      <div className="mt-6 space-y-3">
        {chartData.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </div>
              <span className="font-medium text-gray-700">{service.fullName}</span>
            </div>
            <span className="text-primary font-bold">{service.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

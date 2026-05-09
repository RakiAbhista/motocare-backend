import React from 'react';
import { Activity, UserPlus, CreditCard, CheckCircle } from 'lucide-react';

export default function RecentActivities({ activities = [] }) {
  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'user baru':
        return <UserPlus className="w-4 h-4" />;
      case 'pembayaran':
        return <CreditCard className="w-4 h-4" />;
      case 'completed':
      case 'selesai':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getColorClass = (type) => {
    switch (type.toLowerCase()) {
      case 'user baru':
        return 'bg-blue-100 text-secondary';
      case 'pembayaran':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const displayActivities = activities.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h3>
          <p className="text-sm text-gray-500 mt-1">Aktivitas sistem terkini</p>
        </div>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {displayActivities.length > 0 ? (
          displayActivities.map((activity, index) => (
            <div key={index} className="flex gap-4 pb-4 last:pb-0 last:border-0 border-b border-gray-100">
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getColorClass(activity.type)}`}>
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{activity.type}</p>
                <p className="text-sm text-gray-600 truncate">{activity.desc}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>Tidak ada aktivitas</p>
          </div>
        )}
      </div>
    </div>
  );
}

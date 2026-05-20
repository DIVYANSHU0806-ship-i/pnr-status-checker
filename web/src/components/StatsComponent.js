import React from 'react';
import { FiBarChart2 } from 'react-icons/fi';

function StatsComponent({ stats }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <FiBarChart2 className="text-2xl text-blue-600" />
        <h3 className="text-2xl font-bold">Statistics</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-gray-600 text-sm">Total Searches</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalSearches || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-gray-600 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmed || 0}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded">
          <p className="text-gray-600 text-sm">Waiting/RAC</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.waiting || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsComponent;
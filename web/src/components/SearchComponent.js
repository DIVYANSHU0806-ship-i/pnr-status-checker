import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchComponent({ onSearch, loading }) {
  const [pnrInput, setPnrInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(pnrInput.trim());
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">PNR Status Checker</h1>
      <p className="text-gray-600 mb-6">Enter your 10-digit PNR number to check your railway ticket status</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter 10-digit PNR number"
          value={pnrInput}
          onChange={(e) => setPnrInput(e.target.value)}
          maxLength="10"
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold disabled:opacity-50"
        >
          <FiSearch /> {loading ? 'Checking...' : 'Check'}
        </button>
      </form>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p className="font-semibold mb-2">Test PNRs (Mock Data):</p>
        <p>1234567890 (Confirmed), 9876543210 (RAC), 5555555555 (Waiting List)</p>
      </div>
    </div>
  );
}

export default SearchComponent;
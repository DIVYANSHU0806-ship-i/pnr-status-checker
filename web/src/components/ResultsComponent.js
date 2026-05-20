import React from 'react';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

function ResultsComponent({ results }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'CNF': return 'text-green-600';
      case 'RAC': return 'text-yellow-600';
      case 'WL': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'CNF': return 'Confirmed';
      case 'RAC': return 'RAC (Reservation Against Cancellation)';
      case 'WL': return 'Waiting List';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="flex items-center gap-3 mb-6">
        {results.status === 'CNF' ? (
          <FiCheckCircle className="text-3xl text-green-600" />
        ) : (
          <FiAlertCircle className="text-3xl text-yellow-600" />
        )}
        <div>
          <h2 className="text-2xl font-bold">Status: {getStatusLabel(results.status)}</h2>
          <p className={`text-lg font-semibold ${getStatusColor(results.status)}`}>{results.status}</p>
        </div>
      </div>

      {results.passengers && (
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Passengers</h3>
          {results.passengers.map((p, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded mb-2">
              <p><strong>{p.name}</strong> • {p.seat || 'No seat assigned'}</p>
              <p className="text-sm text-gray-600">Age: {p.age}, Gender: {p.gender}</p>
            </div>
          ))}
        </div>
      )}

      {results.trainDetails && (
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3">Train Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Train:</strong> {results.trainDetails.trainName}</p>
            <p><strong>Number:</strong> {results.trainDetails.trainNumber}</p>
            <p><strong>Route:</strong> {results.trainDetails.boardingStation} → {results.trainDetails.destination}</p>
            <p><strong>Date:</strong> {results.trainDetails.journeyDate}</p>
            <p><strong>Departure:</strong> {results.trainDetails.departureTime}</p>
            <p><strong>Arrival:</strong> {results.trainDetails.arrivalTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultsComponent;
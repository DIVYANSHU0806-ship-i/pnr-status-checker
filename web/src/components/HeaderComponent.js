import React from 'react';

function HeaderComponent() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold">🚂 PNR Status Checker</h1>
        <p className="text-blue-100 mt-2">Check your railway ticket status instantly</p>
      </div>
    </header>
  );
}

export default HeaderComponent;
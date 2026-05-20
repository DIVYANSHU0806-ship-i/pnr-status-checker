import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './components/SearchComponent';
import ResultsComponent from './components/ResultsComponent';
import StatsComponent from './components/StatsComponent';
import HeaderComponent from './components/HeaderComponent';
import { ToastContainer, toast } from 'react-hot-toast';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [currentPNR, setCurrentPNR] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/pnr/stats`);
      setStats(response.data);
    } catch (error) {
      console.log('Stats not available');
    }
  };

  const handleSearch = async (pnrNumber) => {
    if (!pnrNumber || pnrNumber.length !== 10 || isNaN(pnrNumber)) {
      toast.error('Please enter a valid 10-digit PNR number');
      return;
    }

    setLoading(true);
    setCurrentPNR(pnrNumber);

    try {
      const response = await axios.get(`${API_URL}/pnr/status/${pnrNumber}`);
      setResults(response.data.data);
      toast.success('PNR Status fetched successfully!');
      fetchStats();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to fetch PNR status');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ToastContainer position="top-right" />
      <HeaderComponent />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <SearchComponent onSearch={handleSearch} loading={loading} />
          {results && <ResultsComponent results={results} />}
          {stats && <StatsComponent stats={stats} />}
        </div>
      </div>
    </div>
  );
}

export default App;
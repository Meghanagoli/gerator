import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';


function App() {
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    startDate: null,
    endDate: null,
    sellerRole: [],
    transactionType: [],
    status: [],
    warranty: [],
    shipping: [],
    country: [],
    deviceCategory: [],
    oemBrand: [],
    yearOfManufacture: [],
    clinicalApplications: [],
    deviceUse: [],
    physicalLocation: [],
  });

  const [showResults, setShowResults] = useState(false);
  const [sortOption, setSortOption] = useState('');

  const handleApplyFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setShowResults(true);
  };

  const handleSetSortOption = (opt) => {
    setSortOption(opt);
    if (opt !== '') {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/devices"
            element={
              <div className="app">
                <Header />
                <div className="app-body">
                  <Sidebar initialFilters={filters} onApply={handleApplyFilters} />
                  <MainContent
                    filters={filters}
                    sortOption={sortOption}
                    setSortOption={handleSetSortOption}
                    showResults={showResults}
                  />
                </div>
                <Footer />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
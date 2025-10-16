import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import ListingsHeader from './ListingsHeader';
import { fetchDevices } from '../store/deviceSlice';
import EquipmentListing from './EquipmentListing';
import './MainContent.css';

function MainContent({ filters = {}, sortOption = 'date_desc', setSortOption = () => { }, showResults = false }) {
  const dispatch = useDispatch();
  const { devices = [], loading } = useSelector((state) => state.devices || { devices: [], loading: false });

  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const sortedDevices = [...(devices || [])];

  if (sortOption) {
    if (sortOption === 'date_desc') {
      sortedDevices.sort((a, b) => new Date(b.post_publish_date) - new Date(a.post_publish_date));
    } else if (sortOption === 'date_asc') {
      sortedDevices.sort((a, b) => new Date(a.post_publish_date) - new Date(b.post_publish_date));
    } else if (sortOption === 'price_asc') {
      sortedDevices.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortOption === 'price_desc') {
      sortedDevices.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
  }


  const filteredDevices = sortedDevices.filter((device) => {
    if (filters.priceMin != null && Number(device.price || 0) < Number(filters.priceMin)) return false;
    if (filters.priceMax != null && Number(device.price || 0) > Number(filters.priceMax)) return false;

    if (filters.startDate) {
      const deviceDate = device.post_publish_date ? new Date(device.post_publish_date) : null;
      if (!deviceDate || deviceDate < new Date(filters.startDate)) return false;
    }
    if (filters.endDate) {
      const deviceDate = device.post_publish_date ? new Date(device.post_publish_date) : null;
      if (!deviceDate || deviceDate > new Date(filters.endDate)) return false;
    }

    if (filters.sellerRole && filters.sellerRole.length > 0) {
      if (!filters.sellerRole.includes(device.seller_role)) return false;
    }

    if (filters.warranty && filters.warranty.length > 0) {
      if (!filters.warranty.includes(device.warranty)) return false;
    }

    if (filters.shipping && filters.shipping.length > 0) {
      if (!filters.shipping.includes(device.shipping)) return false;
    }

    if (filters.country && filters.country.length > 0) {
      if (!filters.country.includes(device.country)) return false;
    }

    if (filters.deviceCategory && filters.deviceCategory.length > 0) {
      if (!filters.deviceCategory.includes(device.title)) return false;
    }

    if ((filters.oemBrand && filters.oemBrand.length > 0) || (filters.clinicalApplications && filters.clinicalApplications.length > 0)) {
      const deviceTags = device.tags ? device.tags.split(',').map(t => t.trim()) : [];

      if (filters.oemBrand && filters.oemBrand.length > 0) {
        const hasOEM = deviceTags.some(tag => filters.oemBrand.includes(tag));
        if (!hasOEM) return false;
      }

      if (filters.clinicalApplications && filters.clinicalApplications.length > 0) {
        const hasClinical = deviceTags.some(tag => filters.clinicalApplications.includes(tag));
        if (!hasClinical) return false;
      }
    }

    if (filters.yearOfManufacture && filters.yearOfManufacture.length > 0) {
      const year = device.created_at ? new Date(device.created_at).getFullYear().toString() : null;
      if (!year || !filters.yearOfManufacture.includes(year)) return false;
    }

    return true;
  });


  const visibleDevices = filteredDevices.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((p) => p + 5);

  if (!showResults) {
    return (
      <main className="main-content">
        <div className="main-content-inner">
          <Breadcrumb />
          <ListingsHeader sortOption={sortOption} setSortOption={setSortOption} />
          <div className="empty-results">
            <p>No devices shown — please apply filters or choose a sorting option to view devices.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="main-content-inner">
        <Breadcrumb />
        <ListingsHeader sortOption={sortOption} setSortOption={setSortOption} />

        <div className="device-grid">
          {loading && <p>Loading devices...</p>}
          {!loading && visibleDevices.length === 0 && <p>No devices found for the selected filters.</p>}
          {!loading && visibleDevices.length > 0 && <EquipmentListing devices={visibleDevices} />}
        </div>

        {!loading && visibleCount < filteredDevices.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </main>
  );
}

export default MainContent;

import React from 'react';
import './ListingsHeader.css';

function ListingsHeader({ sortOption, setSortOption }) {
  return (
    <div className="listings-header">
      <div className="listings-info">
        <h1 className="listings-title">
          Listings Found
        </h1>
        <p className="listings-subtitle">You searched based on the following criteria.</p>
      </div>

      <div className="listings-actions">
        <div className="sort-wrapper">
          <img
            src="https://gerator.com/sliders02.fac1031c.svg"
            alt="sort icon"
            className="sort-icon"
          />
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="date_desc">Date (newest to oldest)</option>
            <option value="date_asc">Date (oldest to newest)</option>
            <option value="price_asc">Price (low to high)</option>
            <option value="price_desc">Price (high to low)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ListingsHeader;

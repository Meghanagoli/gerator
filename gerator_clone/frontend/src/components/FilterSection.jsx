// FilterSection.jsx
import React, { useState, forwardRef, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FilterSection.css';

const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <button type="button" className="date-input-wrapper" onClick={onClick} ref={ref}>
    <span className={`date-input-text ${value ? 'has-value' : ''}`}>{value || placeholder}</span>
  </button>
));
CustomDateInput.displayName = 'CustomDateInput';

function FilterSection({
  title,
  type = 'checkboxes', // 'range' | 'date' | 'checkboxes' | 'search'
  options = [],
  value,
  onChange,
  hasSearch = false,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(Array.isArray(value) ? value : []);

  const rootRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedOptions(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen((s) => !s);

  const notifyArrayChange = (nextArray) => {
    setSelectedOptions(nextArray);
    onChange && onChange(nextArray);
  };

  const toggleSelectOption = (opt) => {
    const arr = Array.isArray(selectedOptions) ? selectedOptions.slice() : [];
    const exists = arr.includes(opt);
    const next = exists ? arr.filter((a) => a !== opt) : [...arr, opt];
    notifyArrayChange(next);
  };

  const handleRangeChange = (field, newVal) => {
    const next = { priceMin: value?.priceMin ?? null, priceMax: value?.priceMax ?? null };
    next[field] = newVal === '' ? null : Number(newVal);
    onChange && onChange(next);
  };

  const handleDateChange = (which, date) => {
    const next = { startDate: value?.startDate ?? null, endDate: value?.endDate ?? null };
    next[which] = date ? date.toISOString() : null;
    onChange && onChange(next);
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  const renderContent = () => {
    if (title === 'Price' || type === 'range') {
      return (
        <div className="filter-inputs">
          <input
            type="number"
            placeholder="Min value"
            value={value?.priceMin ?? ''}
            onChange={(e) => handleRangeChange('priceMin', e.target.value)}
          />
          <span className="input-separator">-</span>
          <input
            type="number"
            placeholder="Max value"
            value={value?.priceMax ?? ''}
            onChange={(e) => handleRangeChange('priceMax', e.target.value)}
          />
        </div>
      );
    }

    if (title === 'Date Posted' || type === 'date') {
      return (
        <div className="filter-inputs">
          <DatePicker
            selected={value?.startDate ? new Date(value.startDate) : null}
            onChange={(d) => handleDateChange('startDate', d)}
            dateFormat="dd MMM yyyy"
            placeholderText="Start Date"
            customInput={<CustomDateInput placeholder="Start Date" />}
          />
          <span className="input-separator">-</span>
          <DatePicker
            selected={value?.endDate ? new Date(value.endDate) : null}
            onChange={(d) => handleDateChange('endDate', d)}
            dateFormat="dd MMM yyyy"
            placeholderText="End Date"
            customInput={<CustomDateInput placeholder="End Date" />}
          />
        </div>
      );
    }

    if (hasSearch || type === 'search') {
      return (
        <div className="filter-search" ref={searchRef}>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder={`Search ${title}`}
              value={query}
              onClick={(e) => {
                e.stopPropagation();
                setIsSearchOpen(true);
              }}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {isSearchOpen && filteredOptions.length > 0 && (
            <div className="dropdown-menu">
              {filteredOptions.map((opt) => (
                <div
                  key={opt}
                  className={`dropdown-item ${selectedOptions.includes(opt) ? 'selected' : ''}`}
                  onClick={() => {
                    // toggle selection...
                    toggleSelectOption(opt);
                    // then close dropdown and clear query so next open shows full list
                    setIsSearchOpen(false);
                    setQuery('');
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}

          {selectedOptions.length > 0 && (
            <div className="selected-tags">
              {selectedOptions.map((opt) => (
                <div key={opt} className="tag">
                  {opt}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => toggleSelectOption(opt)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="filter-checkboxes">
        {options.map((opt) => (
          <label key={opt} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() => toggleSelectOption(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    );
  };

  return (
    <div className="filter-section" ref={rootRef}>
      <div className="filter-header" onClick={toggleOpen}>
        <div className="title-container">
          {hasSearch && (
            <img
              src="https://gerator.com/searchlg.20b6d8d9.svg"
              alt="icon"
              className="filter-search-icon"
            />
          )}
          <h3 className="filter-title">{title}</h3>
        </div>
        <span className={`caret ${isOpen ? 'open' : ''}`}>^</span>
      </div>

      {isOpen && <div className="filter-body">{renderContent()}</div>}
    </div>
  );
}

export default FilterSection;

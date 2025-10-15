import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../assets/image.png";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoRef.current && !logoRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <img src="https://gerator.com/gerator04-1@2x.b5f9e9d4.png" alt="Gerator Logo" className="logo-img" />
          </div>
          <nav className="nav">
            <button className="nav-item">
              Buy
              <svg className="chevron-down" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="nav-item">Jobs</button>
          </nav>
        </div>

        <div className="header-right">
          <button className="sell-button">
            <svg className="plus-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Sell
          </button>

          <div className="profile-dropdown" ref={logoRef}>
            <img
              src={logo}
              alt="Profile Logo"
              className="logo-img"
              onClick={() => setDropdownOpen(prev => !prev)}
            />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/register" className="dropdown-item">Sign Up</Link>
                <Link to="/login" className="dropdown-item">Sign In</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

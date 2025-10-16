import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { AuthContext } from "../auth/AuthContext";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logoRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoRef.current && !logoRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setDropdownOpen(false);
  };

  const getInitials = (email) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo">
            <img
              src="https://gerator.com/gerator04-1@2x.b5f9e9d4.png"
              alt="Gerator Logo"
              className="logo-img"
            />
          </Link>
          <nav className="nav">
            <button className="nav-item">
              Buy
              <svg
                className="chevron-down"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="nav-item">Jobs</button>
          </nav>
        </div>

        <div className="header-right">
          <button className="sell-button">
            <svg
              className="plus-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 3V13M3 8H13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sell
          </button>

          {user ? (
            <div className="profile-dropdown" ref={logoRef}>
              <div
                className="user-profile-icon"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {getInitials(user.email)}
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-item user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>

                  <Link to="/devices" className="dropdown-item">
                    My Devices
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout-btn"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

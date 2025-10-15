import React from 'react';
import './Home.css';
import Header from './Header';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Home() {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <Header />

            <section className="hero-section">
                <div className="hero-content">
                    <h2 className="hero-tagline">
                        Buy, sell, lease, or exchange medical devices, spares, services & software
                    </h2>
                    <div className="hero-buttons">
                        <Link to="/login">
                            <button className="primary-btn">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="secondary-btn">Register</button>
                        </Link>
                        <Link to="/devices">
                            <button className="devices-btn">Explore Devices</button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Optional Features Section */}
            <section className="features-section">
                <div className="feature">
                    <h3>Buy Devices</h3>
                    <p>Find new or pre-owned medical equipment at competitive prices.</p>
                </div>
                <div className="feature">
                    <h3>Sell Devices</h3>
                    <p>Reach buyers worldwide and sell your medical equipment easily.</p>
                </div>
                <div className="feature">
                    <h3>Lease & Exchange</h3>
                    <p>Flexible leasing or exchange options for medical equipment.</p>
                </div>
                <div className="feature">
                    <h3>Software & Services</h3>
                    <p>Access medical software, spares, and professional services.</p>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Home;

import React, { useContext } from "react";
import "./Home.css";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { AuthContext } from "../auth/AuthContext";

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="home-container">
            <Header />

            <section className="hero-section">
                <div className="floating-elements">
                    <div className="floating-circle circle-1"></div>
                    <div className="floating-circle circle-2"></div>
                    <div className="floating-circle circle-3"></div>
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Gerator</h1>
                    <h2 className="hero-tagline">
                        Buy, sell, lease, or exchange medical devices, spares, services &
                        software
                    </h2>
                    <p className="hero-description">
                        Connect with medical professionals worldwide to trade, lease, and
                        exchange medical equipment, software, and services in a trusted
                        marketplace.
                    </p>
                    <div className="hero-buttons">
                        {!user ? (
                            <>
                                <Link to="/login">
                                    <button className="primary-btn">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="secondary-btn">Register</button>
                                </Link>
                            </>
                        ) : (
                            <Link to="/devices">
                                <button className="devices-btn">Explore Devices</button>
                            </Link>
                        )}
                        <Link to="/devices">
                            <button className="devices-btn">Browse Marketplace</button>
                        </Link>
                    </div>
                </div>
            </section>

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

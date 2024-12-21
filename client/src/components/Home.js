import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Your Health, Our Priority</h1>
                    <p>Find nearby hospitals, manage appointments, and access your health records all in one place.</p>
                    <div className="hero-buttons">
                        <Link to="/hospitals" className="primary-btn">Find Hospitals</Link>
                        <Link to="/register" className="secondary-btn">Get Started</Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>Our Services</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🏥</div>
                        <h3>Hospital Locator</h3>
                        <p>Find nearby hospitals with real-time availability and emergency services.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3>Appointment Booking</h3>
                        <p>Schedule appointments with healthcare providers easily.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>Health Records</h3>
                        <p>Access and manage your medical records securely.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚑</div>
                        <h3>Emergency Services</h3>
                        <p>Quick access to emergency care information and services.</p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="cta-content">
                    <h2>Ready to Take Control of Your Health?</h2>
                    <p>Join thousands of users who trust HealthCare Hub for their medical needs.</p>
                    <Link to="/register" className="cta-button">Sign Up Now</Link>
                </div>
            </section>
        </div>
    );
};

export default Home; 
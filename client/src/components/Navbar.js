import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const fetchNearbyHospitals = () => {
        // Your fetch logic here
    };

    const filterHospitals = () => {
        // Your filter logic here
    };

    useEffect(() => {
        fetchNearbyHospitals();
    }, [fetchNearbyHospitals]);

    useEffect(() => {
        filterHospitals();
    }, [filterHospitals]);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <span className="brand-logo">⚕️</span>
                <span className="brand-name">HealthCare Hub</span>
            </Link>

            <div className="nav-links">
                <Link 
                    to="/" 
                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                    <span className="nav-link-icon">🏠</span>
                    Home
                </Link>
                <Link 
                    to="/hospitals" 
                    className={`nav-link ${isActive('/hospitals') ? 'active' : ''}`}
                >
                    <span className="nav-link-icon">🏥</span>
                    Find Hospitals
                </Link>
                <Link 
                    to="/health-records" 
                    className={`nav-link ${isActive('/health-records') ? 'active' : ''}`}
                >
                    <span className="nav-link-icon">📋</span>
                    Health Records
                </Link>
                <Link 
                    to="/appointments" 
                    className={`nav-link ${isActive('/appointments') ? 'active' : ''}`}
                >
                    <span className="nav-link-icon">📅</span>
                    Appointments
                </Link>
            </div>

            <div className="auth-buttons">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/register" className="register-btn">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar; 
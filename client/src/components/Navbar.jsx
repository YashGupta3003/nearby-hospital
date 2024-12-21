import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase() || 'U';
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="nav-logo">
                    🏥 HealthCare Hub
                </Link>
            </div>
            <div className="navbar-middle">
                <Link 
                    to="/hospitals" 
                    className={`nav-button ${location.pathname === '/hospitals' ? 'active' : ''}`}
                >
                    Find Hospitals
                </Link>
                <Link 
                    to="/appointments" 
                    className={`nav-button ${location.pathname === '/appointments' ? 'active' : ''}`}
                >
                    Appointments
                </Link>
                <Link 
                    to="/health-records" 
                    className={`nav-button ${location.pathname === '/health-records' ? 'active' : ''}`}
                >
                    Health Records
                </Link>
            </div>
            <div className="navbar-right">
                {user ? (
                    <div className="user-info">
                        <div className="user-avatar">
                            {getInitials(user.name)}
                        </div>
                        <span className="user-name">{user.name}</span>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="login-btn">Login</Link>
                        <Link to="/register" className="register-btn">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 
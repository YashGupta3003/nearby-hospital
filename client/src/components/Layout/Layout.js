import React from 'react';
import Navbar from '../Navbar';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>HealthCare Hub</h3>
                        <p>Making healthcare accessible to everyone</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/hospitals">Find Hospitals</a></li>
                            <li><a href="/appointments">Book Appointment</a></li>
                            <li><a href="/health-records">Health Records</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact</h4>
                        <ul>
                            <li>Email: support@healthcarehub.com</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Emergency: 911</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 HealthCare Hub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout; 
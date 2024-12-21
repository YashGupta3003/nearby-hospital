import React from 'react';
import './Button.css';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'medium', 
    loading = false,
    icon,
    ...props 
}) => {
    return (
        <button 
            className={`btn btn-${variant} btn-${size} ${loading ? 'loading' : ''}`}
            disabled={loading}
            {...props}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {loading ? <span className="loader"></span> : children}
        </button>
    );
};

export default Button; 
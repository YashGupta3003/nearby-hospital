import React from 'react';
import './Card.css';

const Card = ({ 
    children, 
    title, 
    subtitle, 
    image, 
    actions,
    className = '',
    ...props 
}) => {
    return (
        <div className={`card ${className}`} {...props}>
            {image && (
                <div className="card-image">
                    <img src={image} alt={title} />
                </div>
            )}
            <div className="card-content">
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
                {children}
            </div>
            {actions && (
                <div className="card-actions">
                    {actions}
                </div>
            )}
        </div>
    );
};

export default Card; 
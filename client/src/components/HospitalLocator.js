import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import './HospitalLocator.css';

// Custom marker icons with different colors for different types of facilities
const createHospitalIcon = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const hospitalIcon = createHospitalIcon('red');
const emergencyIcon = createHospitalIcon('orange');
const specialtyIcon = createHospitalIcon('violet');
const userIcon = createHospitalIcon('blue');

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const HospitalLocator = () => {
    const [hospitals, setHospitals] = useState([]);
    const [filteredHospitals, setFilteredHospitals] = useState([]);
    const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        emergency: false,
        wheelchair: false,
        specialty: false,
        distance: 5 // Default 5km radius
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation([latitude, longitude]);
                fetchNearbyHospitals(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error);
                setError('Could not get your location. Please enable location services.');
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    useEffect(() => {
        filterHospitals();
    }, [hospitals, searchTerm, filters]);

    const filterHospitals = () => {
        let filtered = hospitals;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(hospital => 
                hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hospital.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply distance filter
        filtered = filtered.filter(hospital => {
            const distance = calculateDistance(
                currentLocation[0],
                currentLocation[1],
                hospital.lat,
                hospital.lon
            );
            return parseFloat(distance) <= filters.distance;
        });

        // Apply other filters
        if (filters.emergency) {
            filtered = filtered.filter(hospital => hospital.emergency === 'Yes');
        }
        if (filters.wheelchair) {
            filtered = filtered.filter(hospital => hospital.wheelchair === 'Yes');
        }
        if (filters.specialty) {
            filtered = filtered.filter(hospital => hospital.services?.length > 0);
        }

        setFilteredHospitals(filtered);
    };

    const getHospitalIcon = (hospital) => {
        if (!hospital) return hospitalIcon;
        if (hospital.emergency === 'Yes') return emergencyIcon;
        if (hospital.services?.length > 0) return specialtyIcon;
        return hospitalIcon;
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(1);
    };

    const fetchNearbyHospitals = async (lat, lng) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/hospitals/nearby`,
                {
                    params: { 
                        latitude: lat, 
                        longitude: lng,
                        radius: filters.distance * 1000 // Convert km to meters
                    }
                }
            );

            if (response.data && Array.isArray(response.data)) {
                setHospitals(response.data);
            } else {
                setError('Invalid response format from server');
                setHospitals([]);
            }
        } catch (err) {
            console.error('Error fetching hospitals:', err);
            setError('Could not fetch nearby hospitals. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <h2>Finding Nearby Hospitals</h2>
                <p>Please wait while we locate hospitals in your area...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-icon">⚠️</div>
                <h2>Error</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="hospital-locator-container">
            <div className="sidebar">
                <div className="search-filters">
                    <input
                        type="text"
                        placeholder="Search hospitals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="distance-filter">
                        <label>Distance: {filters.distance} km</label>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            step="0.5"
                            value={filters.distance}
                            onChange={(e) => setFilters({...filters, distance: parseFloat(e.target.value)})}
                            className="distance-slider"
                        />
                    </div>
                    <div className="filters">
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={filters.emergency}
                                onChange={(e) => setFilters({...filters, emergency: e.target.checked})}
                            />
                            Emergency Services
                        </label>
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={filters.wheelchair}
                                onChange={(e) => setFilters({...filters, wheelchair: e.target.checked})}
                            />
                            Wheelchair Accessible
                        </label>
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={filters.specialty}
                                onChange={(e) => setFilters({...filters, specialty: e.target.checked})}
                            />
                            Specialty Services
                        </label>
                    </div>
                </div>
                <div className="hospital-list">
                    {filteredHospitals.map(hospital => hospital && (
                        <div 
                            key={hospital.id || Math.random()}
                            className={`hospital-card ${selectedHospital?.id === hospital.id ? 'selected' : ''}`}
                            onClick={() => setSelectedHospital(hospital)}
                        >
                            <div className="hospital-card-header">
                                <h3>{hospital.name}</h3>
                                <span className="distance">
                                    {calculateDistance(
                                        currentLocation[0],
                                        currentLocation[1],
                                        hospital.lat,
                                        hospital.lon
                                    )} km
                                </span>
                            </div>
                            <p className="address">{hospital.address}</p>
                            <div className="hospital-details">
                                <div className="detail-item">
                                    <span className="icon">📞</span>
                                    <span>{hospital.phone || 'N/A'}</span>
                                </div>
                                {hospital.emergency === 'Yes' && (
                                    <div className="emergency-badge">
                                        🚑 Emergency Services
                                    </div>
                                )}
                                {hospital.wheelchair === 'Yes' && (
                                    <div className="wheelchair-badge">
                                        ♿ Wheelchair Accessible
                                    </div>
                                )}
                            </div>
                            {hospital.services?.length > 0 && (
                                <div className="services">
                                    <h4>Services:</h4>
                                    <div className="service-tags">
                                        {hospital.services.map((service, index) => (
                                            <span key={index} className="service-tag">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="map-container">
                <MapContainer 
                    center={currentLocation} 
                    zoom={13} 
                    style={{ height: '100%', width: '100%' }}
                >
                    <ChangeView center={currentLocation} zoom={13} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    
                    <Marker position={currentLocation} icon={userIcon}>
                        <Popup>
                            <div className="current-location-popup">
                                <h3>Your Location</h3>
                                <p>You are here</p>
                            </div>
                        </Popup>
                    </Marker>

                    {filteredHospitals.map(hospital => hospital && (
                        <Marker
                            key={hospital.id || Math.random()}
                            position={[hospital.lat, hospital.lon]}
                            icon={getHospitalIcon(hospital)}
                        >
                            <Popup>
                                <div className="hospital-popup">
                                    <h3>{hospital.name}</h3>
                                    <p><strong>Address:</strong> {hospital.address}</p>
                                    <p><strong>Phone:</strong> {hospital.phone || 'N/A'}</p>
                                    {hospital.website && hospital.website !== 'N/A' && (
                                        <p>
                                            <strong>Website:</strong>{' '}
                                            <a href={hospital.website} target="_blank" rel="noopener noreferrer">
                                                Visit website
                                            </a>
                                        </p>
                                    )}
                                    <div className="hospital-status">
                                        {hospital.emergency === 'Yes' && (
                                            <span className="status-badge emergency">
                                                🚑 Emergency Services
                                            </span>
                                        )}
                                        {hospital.wheelchair === 'Yes' && (
                                            <span className="status-badge accessible">
                                                ♿ Wheelchair Accessible
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        className="directions-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(
                                                `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`,
                                                '_blank'
                                            );
                                        }}
                                    >
                                        Get Directions
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default HospitalLocator; 
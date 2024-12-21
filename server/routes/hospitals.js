const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get nearby hospitals
router.get('/nearby', async (req, res) => {
    try {
        const { latitude, longitude, radius = 10000 } = req.query;

        // Overpass API query to find hospitals
        const query = `
            [out:json][timeout:25];
            (
                node["amenity"="hospital"](around:${radius},${latitude},${longitude});
                way["amenity"="hospital"](around:${radius},${latitude},${longitude});
                relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
            );
            out body;
            >;
            out skel qt;
        `;

        const response = await axios.get('https://overpass-api.de/api/interpreter', {
            params: { data: query }
        });

        // Transform the data to a more usable format
        const hospitals = response.data.elements
            .filter(element => element.tags && element.tags.name) // Only include elements with names
            .map(element => ({
                id: element.id,
                name: element.tags.name,
                address: element.tags['addr:street'] 
                    ? `${element.tags['addr:street']} ${element.tags['addr:housenumber'] || ''}`
                    : 'Address not available',
                lat: element.lat || element.center?.lat,
                lon: element.lon || element.center?.lon,
                phone: element.tags.phone || 'N/A',
                website: element.tags.website || 'N/A',
                emergency: element.tags.emergency === 'yes' ? 'Yes' : 'No',
                wheelchair: element.tags.wheelchair || 'Unknown',
                distance: `${((radius / 1000) * 0.621371).toFixed(1)} miles`, // Convert to miles
                services: element.tags.healthcare ? [element.tags.healthcare] : []
            }))
            .filter(hospital => hospital.lat && hospital.lon); // Only include hospitals with valid coordinates

        res.json(hospitals);
    } catch (err) {
        console.error('Error fetching hospitals from Overpass API:', err);
        res.status(500).json({ 
            message: 'Error fetching nearby hospitals',
            error: err.message 
        });
    }
});

// Get all hospitals
router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.findAll();
        res.json(hospitals);
    } catch (err) {
        console.error('Error in GET /:', err);
        res.status(500).json({ 
            message: 'Error fetching hospitals',
            error: err.message 
        });
    }
});

// Get single hospital
router.get('/:id', async (req, res) => {
    try {
        const hospital = await Hospital.findByPk(req.params.id);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(hospital);
    } catch (err) {
        console.error('Error in GET /:id:', err);
        res.status(500).json({ 
            message: 'Error fetching hospital',
            error: err.message 
        });
    }
});

module.exports = router; 
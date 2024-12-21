const axios = require('axios');

class HospitalLocatorService {
    constructor() {
        this.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
    }

    async findNearbyHospitals(latitude, longitude, radius = 10000) {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${this.googleMapsApiKey}`
            );
            return response.data.results;
        } catch (error) {
            throw new Error('Error fetching nearby hospitals');
        }
    }
}

module.exports = new HospitalLocatorService(); 
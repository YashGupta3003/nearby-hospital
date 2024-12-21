const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// Get all appointments for a user
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user: req.user.id });
        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Create new appointment
router.post('/', auth, async (req, res) => {
    try {
        const { hospitalId, date, time, type } = req.body;
        const newAppointment = new Appointment({
            user: req.user.id,
            hospital: hospitalId,
            date,
            time,
            type
        });

        const appointment = await newAppointment.save();
        res.json(appointment);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router; 
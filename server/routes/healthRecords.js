const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const HealthRecord = require('../models/HealthRecord');

// Get user's health records
router.get('/', auth, async (req, res) => {
    try {
        const records = await HealthRecord.find({ user: req.user.id })
            .sort({ date: -1 });
        res.json(records);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add new health record
router.post('/', auth, async (req, res) => {
    try {
        const { type, data, provider } = req.body;

        const newRecord = new HealthRecord({
            user: req.user.id,
            type,
            data,
            provider,
            date: new Date()
        });

        const record = await newRecord.save();
        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get specific health record
router.get('/:id', auth, async (req, res) => {
    try {
        const record = await HealthRecord.findById(req.params.id);
        
        if (!record) {
            return res.status(404).json({ msg: 'Record not found' });
        }

        // Make sure user owns record
        if (record.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        res.json(record);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const Aircraft = require('../models/aircraft.model');

router.get('/', async (req, res) => {
    try {
        const aircrafts = await Aircraft.find().populate('operator');
        res.status(200).json(aircrafts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const aircraft = await Aircraft.findById(req.params.id).populate('operator');
        if (!aircraft) {
            return res.status(404).json({ message: 'Aircraft not found' });
        }
        res.status(200).json(aircraft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const aircraft = new Aircraft(req.body);
        const savedAircraft = await aircraft.save();
        res.status(201).json(savedAircraft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id/edit', async (req, res) => {
    try {
        const updatedAircraft = await Aircraft.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAircraft) {
            return res.status(404).json({ message: 'Aircraft not found' });
        }
        res.status(200).json(updatedAircraft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id/delete', async (req, res) => {
    try {
        const deletedAircraft = await Aircraft.findByIdAndDelete(req.params.id);
        if (!deletedAircraft) {
            return res.status(404).json({ message: 'Aircraft not found' });
        }
        res.status(200).json(deletedAircraft);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const express = require('express');
const { AircraftName } = require("../models/aircraft.model");
const router = express.Router();

// GET all AircraftNames
router.get('/', async (req, res) => {
    try {
        const AircraftNames = await AircraftName.find();
        res.status(200).json(AircraftNames);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific AircraftName by ID
router.get('/:id', async (req, res) => {
    try {
        const aircraftName = await AircraftName.findById(req.params.id);
        if (!aircraftName) {
            return res.status(404).json({ message: 'AircraftName not found' });
        }
        res.status(200).json(aircraftName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST (create) a new AircraftName
router.post('/create', async (req, res) => {
    try {
        const aircraftName = new AircraftName(req.body);
        const savedAircraftName = await aircraftName.save();
        res.status(201).json(savedAircraftName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) an AircraftName by ID
router.put('/:id/edit', async (req, res) => {
    try {
        const updatedAircraftName = await AircraftName.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAircraftName) {
            return res.status(404).json({ message: 'AircraftName not found' });
        }
        res.status(200).json(updatedAircraftName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE an AircraftName by ID
router.delete('/:id/delete', async (req, res) => {
    try {
        const deletedAircraftName = await AircraftName.findByIdAndDelete(req.params.id);
        if (!deletedAircraftName) {
            return res.status(404).json({ message: 'AircraftName not found' });
        }
        res.status(200).json(deletedAircraftName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

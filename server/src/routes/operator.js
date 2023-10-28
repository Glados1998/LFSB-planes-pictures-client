const express = require('express');
const { Operator } = require("../models/aircraft.model");
const router = express.Router();

// GET all operators
router.get('/', async (req, res) => {
    try {
        const operators = await Operator.find();
        res.status(200).json(operators);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific operator by ID
router.get('/:id', async (req, res) => {
    try {
        const operator = await Operator.findById(req.params.id);
        if (!operator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(200).json(operator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST (create) a new operator
router.post('/create', async (req, res) => {
    try {
        const operator = new Operator(req.body);
        const savedOperator = await operator.save();
        res.status(201).json(savedOperator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT (update) an operator by ID
router.put('/:id/edit', async (req, res) => {
    try {
        const updatedOperator = await Operator.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOperator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(200).json(updatedOperator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE an operator by ID
router.delete('/:id/delete', async (req, res) => {
    try {
        const deletedOperator = await Operator.findByIdAndDelete(req.params.id);
        if (!deletedOperator) {
            return res.status(404).json({ message: 'Operator not found' });
        }
        res.status(200).json(deletedOperator);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

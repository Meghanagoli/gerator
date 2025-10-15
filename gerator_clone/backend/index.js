// backend/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());

// GET all devices
app.get('/api/devices', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM devices ');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET device by ID
app.get('/api/devices/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM devices WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Device not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

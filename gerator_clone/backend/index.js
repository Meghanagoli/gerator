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
const JWT_SECRET = process.env.JWT_SECRET;

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'All fields required' });

    const [userExists] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    if (userExists.length) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
    res.json({ message: 'User registered successfully' });
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields required' });

    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

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

// backend/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,       // e.g., sql12.freesqldatabase.com
    user: process.env.DB_USER,       // your DB username
    password: process.env.DB_PASSWORD, // your DB password
    database: process.env.DB_NAME,   // your DB name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

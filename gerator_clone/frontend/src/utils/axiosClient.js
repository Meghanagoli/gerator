// src/utils/axiosClient.js
import axios from 'axios';

// ✅ Handle both CRA (process.env.REACT_APP_...) and Vite (import.meta.env.VITE_...)
const API_BASE =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) ||
    (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_BASE) ||
    'https://gerator-backend-1.onrender.com';

const axiosClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set default Authorization header from localStorage at startup
const token = localStorage.getItem('auth_token');
if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export default axiosClient;

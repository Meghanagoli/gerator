import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await register(form);
        if (res.ok) {
            navigate('/login');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2 className="register-title">Create Account</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        required
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        required
                    />
                    <button type="submit">Register</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p className="redirect-text">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}

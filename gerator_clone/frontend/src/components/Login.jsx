import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const res = await login(form);
        if (res.ok) {
            navigate('/devices');
        } else {
            setError(res.error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="login-form">
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
                    <button type="submit">Login</button>
                    {error && <p className="error">{error}</p>}
                </form>
                <p className="redirect-text">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
}

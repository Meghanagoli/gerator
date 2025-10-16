// src/auth/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const u = localStorage.getItem('auth_user');
            return u ? JSON.parse(u) : null;
        } catch {
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('auth_token') || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosClient.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const saveAuth = (userObj, jwt) => {
        setUser(userObj);
        setToken(jwt);
        localStorage.setItem('auth_user', JSON.stringify(userObj));
        localStorage.setItem('auth_token', jwt);
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
    };

    const register = async ({ name, email, password }) => {
        setLoading(true);
        try {
            await axiosClient.post('/api/register', { name, email, password });
            setLoading(false);
            return { ok: true };
        } catch (err) {
            setLoading(false);
            return { ok: false, error: err.response?.data?.message || err.message };
        }
    };

    const login = async ({ email, password }) => {
        setLoading(true);
        try {
            const res = await axiosClient.post('/api/login', { email, password });
            const { token: jwt, user: userObj } = res.data;
            saveAuth(userObj, jwt);
            setLoading(false);
            return { ok: true };
        } catch (err) {
            setLoading(false);
            return { ok: false, error: err.response?.data?.message || err.message };
        }
    };

    const logout = () => {
        clearAuth();
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

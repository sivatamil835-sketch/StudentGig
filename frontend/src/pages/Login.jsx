import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            const role = useAuthStore.getState().user?.user_metadata?.role;
            if (role === 'employer') navigate('/employer-dashboard');
            else navigate('/student-dashboard');
        }
    };

    return (
        <div className="auth-page">
            <div className="card auth-card">
                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-subtitle">Log in to StudentGig to continue</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email" id="email" className="input"
                            placeholder="you@university.edu"
                            value={email} onChange={(e) => setEmail(e.target.value)} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password" id="password" className="input"
                            placeholder="••••••••"
                            value={password} onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>
                    <div className="auth-options">
                        <label className="remember-me"><input type="checkbox" /> Remember me</label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
                        {isLoading ? 'Logging in…' : 'Log in'}
                    </button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Auth.css';

const Register = () => {
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const { register, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register({ email, password, name, role, company });
        if (result.success) {
            if (role === 'employer') navigate('/employer-dashboard');
            else navigate('/student-dashboard');
        }
    };

    return (
        <div className="auth-page">
            <div className="card auth-card">
                <h2 className="auth-title">Create an account</h2>
                <p className="auth-subtitle">Join StudentGig today</p>

                <div className="role-selector">
                    <button type="button" className={`role-btn ${role === 'student' ? 'active' : ''}`} onClick={() => setRole('student')}>
                        I'm a Student
                    </button>
                    <button type="button" className={`role-btn ${role === 'employer' ? 'active' : ''}`} onClick={() => setRole('employer')}>
                        I'm an Employer
                    </button>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" className="input" placeholder="John Doe"
                            value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" className="input" placeholder="you@example.com"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="input" placeholder="Create a strong password (min 6 chars)"
                            value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
                    </div>
                    {role === 'employer' && (
                        <div className="form-group">
                            <label htmlFor="company">Company Name</label>
                            <input type="text" id="company" className="input" placeholder="Your Startup Inc."
                                value={company} onChange={(e) => setCompany(e.target.value)} required />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
                        {isLoading ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

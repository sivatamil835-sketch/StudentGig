import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuthStore();

    return (
        <nav className="navbar">
            <div className="container nav-content">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">🚀</span> StudentGig
                </Link>
                <div className="nav-links">
                    <Link to="/jobs">Find Jobs</Link>
                    <Link to="/talents">Hire Students</Link>
                </div>
                <div className="nav-actions">
                    {user ? (
                        <>
                            {user.role === 'student' ? (
                                <Link to="/student-dashboard" className="btn btn-outline">Dashboard</Link>
                            ) : (
                                <Link to="/employer-dashboard" className="btn btn-outline">Dashboard</Link>
                            )}
                            <button onClick={logout} className="btn btn-primary">Log out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Log in</Link>
                            <Link to="/register" className="btn btn-primary">Sign up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem' }}>Welcome back, {user?.role}!</h2>

            {user?.role === 'student' ? (
                <div className="card">
                    <h3>Your Applications</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>You haven't applied to any jobs yet.</p>
                </div>
            ) : (
                <div className="card">
                    <h3>Your Posted Jobs</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>You haven't posted any jobs yet.</p>
                    <button className="btn-primary" style={{ marginTop: '1rem' }}>Post a New Job</button>
                </div>
            )}
        </div>
    );
}

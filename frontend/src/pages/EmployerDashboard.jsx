import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore, { supabase } from '../store/authStore';
import './Dashboard.css';

const EmployerDashboard = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [activeTab, setActiveTab] = useState('listings');

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        const fetchListings = async () => {
            const { data } = await supabase.from('jobs').select('*, applications(count)').eq('employer_id', user.id);
            if (data) setListings(data);
        };
        fetchListings();
    }, [user, navigate]);

    const fetchApplicants = async (jobId) => {
        const { data } = await supabase.from('applications').select('*, users:student_id(email, user_metadata)').eq('job_id', jobId);
        if (data) setApplicants(data);
        setActiveTab('applicants');
    };

    const updateStatus = async (appId, status) => {
        await supabase.from('applications').update({ status }).eq('id', appId);
        setApplicants(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    };

    const meta = user?.user_metadata || {};

    return (
        <div className="dashboard-layout container">
            <aside className="dashboard-sidebar">
                <div className="profile-widget card">
                    <div className="avatar-placeholder employer-avatar">🏢</div>
                    <h3>{meta.company_name || 'Your Company'}</h3>
                    <p className="text-muted">{meta.full_name || user?.email}</p>
                </div>
                <nav className="dashboard-nav card mt-4">
                    <ul>
                        <li className={activeTab === 'listings' ? 'active' : ''} onClick={() => setActiveTab('listings')}>Manage Jobs</li>
                        <li className={activeTab === 'applicants' ? 'active' : ''} onClick={() => setActiveTab('applicants')}>Applicants</li>
                        <li onClick={() => navigate('/post-job')}>Post New Job</li>
                        <li onClick={() => navigate('/chat')}>Messages</li>
                        <li onClick={() => { logout(); navigate('/'); }}>Log out</li>
                    </ul>
                </nav>
            </aside>

            <main className="dashboard-main">
                <div className="dashboard-header flex-between mb-4">
                    <h1 className="page-title">Employer Dashboard</h1>
                    <button className="btn btn-primary" onClick={() => navigate('/post-job')}>+ Post a Job</button>
                </div>

                {activeTab === 'listings' && (
                    <section>
                        <h2 className="section-title mb-3">Your Job Listings</h2>
                        {listings.length === 0 ? (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <p className="text-muted">No jobs posted yet.</p>
                                <button className="btn btn-primary mt-3" onClick={() => navigate('/post-job')}>Post Your First Job</button>
                            </div>
                        ) : (
                            <div className="card list-container">
                                {listings.map(job => (
                                    <div key={job.id} className="list-item flex-between border-bottom pb-3 mb-3">
                                        <div>
                                            <h4>{job.title}</h4>
                                            <p className="text-muted text-sm">{job.applications?.[0]?.count || 0} Applications • {job.budget}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="status-badge status-active">Active</span>
                                            <button className="btn btn-outline btn-sm" onClick={() => fetchApplicants(job.id)}>View Applicants</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}

                {activeTab === 'applicants' && (
                    <section>
                        <div className="flex-between mb-3">
                            <h2 className="section-title">Applicants</h2>
                            <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('listings')}>← Back to Listings</button>
                        </div>
                        {applicants.length === 0 ? (
                            <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <p className="text-muted">No applicants yet for this job.</p>
                            </div>
                        ) : (
                            <div className="card list-container">
                                {applicants.map(app => (
                                    <div key={app.id} className="list-item applicant-card flex-between border-bottom pb-3 mb-3">
                                        <div className="flex gap-3 items-center">
                                            <div className="avatar-sm">{(app.users?.user_metadata?.full_name || 'S').charAt(0)}</div>
                                            <div>
                                                <h4>{app.users?.user_metadata?.full_name || app.users?.email || 'Applicant'}</h4>
                                                <p className="text-muted text-sm">{app.users?.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
                                            {app.status === 'Pending' && <>
                                                <button className="btn btn-primary btn-sm" onClick={() => updateStatus(app.id, 'Accepted')}>Hire</button>
                                                <button className="btn btn-outline btn-sm" onClick={() => updateStatus(app.id, 'Rejected')}>Reject</button>
                                            </>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default EmployerDashboard;

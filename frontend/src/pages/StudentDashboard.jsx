import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore, { supabase } from '../store/authStore';
import JobCard from '../components/JobCard';
import './Dashboard.css';

const StudentDashboard = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([
        { id: 3, title: 'Fullstack Intern', budget: '$500', duration: '1 month', skills: ['React', 'Node.js'], type: 'Remote' },
        { id: 4, title: 'Figma Prototyping', budget: '$150', duration: '1 week', skills: ['Figma'], type: 'Remote' },
    ]);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        const fetchApplications = async () => {
            const { data } = await supabase.from('applications').select('*, jobs(title, budget)').eq('student_id', user.id);
            if (data) setApplications(data);
        };
        fetchApplications();
    }, [user, navigate]);

    const meta = user?.user_metadata || {};

    return (
        <div className="dashboard-layout container">
            <aside className="dashboard-sidebar">
                <div className="profile-widget card">
                    <div className="avatar-placeholder">
                        {meta.full_name?.charAt(0) || 'S'}
                    </div>
                    <h3>{meta.full_name || 'Student'}</h3>
                    <p className="text-muted">{user?.email}</p>
                    <div className="skills-tags mt-3">
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">Python</span>
                    </div>
                </div>
                <nav className="dashboard-nav card mt-4">
                    <ul>
                        <li className="active">Overview</li>
                        <li onClick={() => navigate('/jobs')}>Find Jobs</li>
                        <li onClick={() => navigate('/chat')}>Messages <span className="badge">3</span></li>
                        <li onClick={() => { logout(); navigate('/'); }}>Log out</li>
                    </ul>
                </nav>
            </aside>

            <main className="dashboard-main">
                <div className="stats-grid">
                    <div className="stat-card card"><h4>Applications</h4><p className="stat-value">{applications.length}</p></div>
                    <div className="stat-card card"><h4>Active Projects</h4><p className="stat-value">1</p></div>
                    <div className="stat-card card"><h4>Total Earned</h4><p className="stat-value">$450</p></div>
                </div>

                <section className="dashboard-section mt-5">
                    <h2 className="section-title">Your Applications</h2>
                    <div className="applications-list card">
                        {applications.length === 0 ? (
                            <p className="text-muted" style={{ padding: '1rem 0' }}>You haven't applied to any jobs yet. <Link to="/jobs" className="view-all">Browse jobs →</Link></p>
                        ) : applications.map(app => (
                            <div key={app.id} className="application-item">
                                <div>
                                    <h4>{app.jobs?.title || 'Job'}</h4>
                                    <p className="text-muted">{app.jobs?.budget}</p>
                                </div>
                                <span className={`status-badge status-${app.status?.toLowerCase()}`}>{app.status}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="dashboard-section mt-5">
                    <h2 className="section-title">AI Recommended Jobs</h2>
                    <p className="text-muted mb-4">Based on your skills</p>
                    <div className="jobs-grid">
                        {recommendedJobs.map(job => <JobCard key={job.id} job={job} />)}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StudentDashboard;

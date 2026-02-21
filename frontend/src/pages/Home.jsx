import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import JobCard from '../components/JobCard';

import { supabase } from '../store/authStore';

const Home = () => {
    const [jobs, setJobs] = React.useState([]);

    React.useEffect(() => {
        const fetchJobs = async () => {
            const { data } = await supabase.from('jobs').select('*').limit(3).order('created_at', { ascending: false });
            if (data) setJobs(data);
        };
        fetchJobs();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Find Part-Time Jobs & <span className="highlight">Freelance Projects</span> for Students
                    </h1>
                    <p className="hero-subtitle">
                        AI-powered platform connecting ambitious students with real opportunities from top startups and employers.
                    </p>
                    <div className="hero-cta">
                        <Link to="/jobs" className="btn btn-primary btn-lg">Find Jobs</Link>
                        <Link to="/register" className="btn btn-outline btn-lg">Create Profile</Link>
                    </div>
                </div>
            </section>

            {/* Featured Jobs Section */}
            <section className="featured-jobs section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Latest Opportunities</h2>
                        <Link to="/jobs" className="view-all">View all jobs →</Link>
                    </div>
                    <div className="jobs-grid">
                        {jobs.length > 0 ? jobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        )) : (
                            <div className="text-center py-4 text-muted" style={{ gridColumn: '1/-1' }}>Loading latest opportunities...</div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

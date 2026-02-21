import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import JobCard from '../components/JobCard';

const dummyJobs = [
    { id: 1, title: 'React Frontend Developer', budget: '$200 - $500', duration: '2 weeks', skills: ['React', 'JavaScript', 'CSS'], type: 'Remote' },
    { id: 2, title: 'Python Backend Scripting', budget: '$100', duration: '3 days', skills: ['Python', 'FastAPI'], type: 'Remote' },
    { id: 3, title: 'UI/UX Design for Startup App', budget: '$300', duration: '1 month', skills: ['Figma', 'UI Design'], type: 'Remote' },
];

const Home = () => {
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
                        {dummyJobs.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

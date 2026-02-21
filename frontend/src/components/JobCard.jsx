import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import './JobCard.css';

const JobCard = ({ job }) => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(false);

    const handleApply = () => {
        if (!user) { navigate('/login'); return; }
        navigate(`/jobs/${job.id}`);
    };

    return (
        <div className="card job-card">
            <div className="job-header">
                <h3 className="job-title">{job.title}</h3>
                <span className="job-budget">{job.budget}</span>
            </div>
            <div className="job-meta">
                <span className="meta-item">⏱ {job.duration}</span>
                <span className="meta-item">📍 {job.type}</span>
            </div>
            <div className="job-skills">
                {job.skills?.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                ))}
            </div>
            <div className="job-footer flex gap-2">
                <button className="btn btn-primary btn-full" onClick={handleApply}>
                    Apply Now
                </button>
                <button
                    className={`btn btn-outline save-btn ${saved ? 'saved' : ''}`}
                    onClick={() => setSaved(!saved)}
                    title={saved ? 'Saved' : 'Save job'}
                >
                    {saved ? '♥' : '♡'}
                </button>
            </div>
        </div>
    );
};

export default JobCard;

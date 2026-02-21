import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuthStore, { supabase } from '../store/authStore';
import './Jobs.css';

const DUMMY_JOB = {
    id: 1, title: 'React Frontend Developer', budget: '$200 - $500',
    duration: '2 weeks', skills: ['React', 'JavaScript', 'CSS'], type: 'Remote',
    description: `We are a fast-growing startup looking for a talented student to help us build out our MVP.

Responsibilities:
- Translate Figma designs into high-quality React code
- Integrate with our REST APIs
- Ensure cross-browser compatibility

Requirements:
- Strong proficiency in JavaScript/TypeScript
- Experience with React functional components
- Good understanding of CSS layout techniques`,
    employer: { name: 'TechNova Startup', rating: '4.9', verified: true },
    postedAt: '2 days ago', applicants: 15,
};

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [job, setJob] = useState(DUMMY_JOB);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
            if (!error && data) setJob(data);
        };
        fetchJob();
    }, [id]);

    const handleApply = async () => {
        if (!user) { navigate('/login'); return; }
        setApplying(true); setError('');
        const { error: err } = await supabase.from('applications').insert([{
            job_id: id, student_id: user.id, status: 'Pending',
        }]);
        setApplying(false);
        if (err) { setError('Could not apply. You may have already applied.'); return; }
        setApplied(true);
    };

    return (
        <div className="job-details-page container py-4">
            <Link to="/jobs" className="back-link mb-4 d-inline-block">← Back to Jobs</Link>

            {error && <div className="auth-error mb-4" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', background: '#fee2e2', color: '#991b1b' }}>{error}</div>}

            <div className="job-details-layout">
                <div className="job-main-info card">
                    <div className="job-header mb-4">
                        <h1 className="job-title-large mb-2">{job.title}</h1>
                        <div className="job-meta-tags flex gap-3 text-muted">
                            <span>⏱ Posted {job.postedAt || 'recently'}</span>
                            <span>📍 {job.type}</span>
                            <span className="job-budget-badge">{job.budget}</span>
                        </div>
                    </div>
                    <div className="job-description mb-5">
                        <h3 className="mb-3">Project Description</h3>
                        <p className="whitespace-pre-line">{job.description}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {(job.skills || []).map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
                        </div>
                    </div>
                </div>

                <aside className="job-sidebar">
                    <div className="job-action-card card mb-4">
                        {applied ? (
                            <div className="auth-success" style={{ padding: '0.75rem', borderRadius: '0.5rem', background: '#dcfce7', color: '#166534' }}>
                                ✅ Application submitted!
                            </div>
                        ) : user?.user_metadata?.role === 'employer' ? (
                            <p className="text-muted text-sm">Employers cannot apply to jobs.</p>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button className="btn btn-primary btn-full btn-lg" onClick={handleApply} disabled={applying}>
                                    {applying ? 'Applying…' : 'Apply Now'}
                                </button>
                                <Link to="/chat" className="btn btn-outline btn-full">Message Employer</Link>
                            </div>
                        )}
                        <p className="text-muted text-xs text-center mt-3">
                            {job.applicants || 0} students have already applied
                        </p>
                    </div>

                    <div className="employer-card card">
                        <h3 className="mb-3 text-sm text-muted uppercase">About the Employer</h3>
                        <div className="flex gap-3 items-center mb-3">
                            <div className="avatar-placeholder employer-avatar-sm">🏢</div>
                            <div>
                                <h4 className="font-semibold">{job.employer?.name || 'Employer'}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="rating">⭐ {job.employer?.rating || '–'}</span>
                                    {job.employer?.verified && <span className="verified-badge">✓ Verified</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default JobDetails;

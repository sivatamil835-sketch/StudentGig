import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { supabase } from '../store/authStore';
import './Auth.css';

const PostJob = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', description: '', budget: '', duration: '', skills: '', type: 'Remote' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); setError(''); setSuccess('');
        const skillsArr = form.skills.split(',').map(s => s.trim());
        const { error: err } = await supabase.from('jobs').insert([{
            title: form.title, description: form.description,
            budget: form.budget, duration: form.duration,
            skills: skillsArr, type: form.type,
            employer_id: user?.id,
        }]);
        setIsLoading(false);
        if (err) { setError(err.message); return; }
        setSuccess('Job posted successfully!');
        setTimeout(() => navigate('/employer-dashboard'), 1500);
    };

    return (
        <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '3rem' }}>
            <div className="card auth-card" style={{ maxWidth: '600px' }}>
                <h2 className="auth-title">Post a New Job</h2>
                <p className="auth-subtitle">Connect with talented students</p>
                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Job Title</label>
                        <input name="title" className="input" placeholder="e.g. React Frontend Developer" value={form.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" className="input" rows="5" placeholder="Describe the project, responsibilities, and requirements..." value={form.description} onChange={handleChange} required style={{ resize: 'vertical' }} />
                    </div>
                    <div className="form-group">
                        <label>Budget</label>
                        <input name="budget" className="input" placeholder="e.g. $200 - $500 or $50/hr" value={form.budget} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input name="duration" className="input" placeholder="e.g. 2 weeks, 1 month" value={form.duration} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Skills Required <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(comma-separated)</span></label>
                        <input name="skills" className="input" placeholder="e.g. React, Python, Figma" value={form.skills} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Work Type</label>
                        <select name="type" className="input" value={form.type} onChange={handleChange}>
                            <option>Remote</option>
                            <option>Hybrid</option>
                            <option>On-site</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={isLoading}>
                        {isLoading ? 'Posting…' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostJob;

import React, { useState } from 'react';
import { supabase } from '../supabase_client';
import { PlusCircle, Users, BarChart, Settings } from 'lucide-react';

const AdminPanel: React.FC = () => {
    const [tab, setTab] = useState('jobs');
    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        location: '',
        experience_level: 'fresher',
        job_type: 'onsite',
        description: '',
        skills_required: ''
    });

    const handlePostJob = async (e: React.FormEvent) => {
        e.preventDefault();
        const formattedJob = {
            ...newJob,
            skills_required: newJob.skills_required.split(',').map(s => s.trim())
        };

        const { error } = await supabase.from('jobs').insert(formattedJob);
        if (error) alert(error.message);
        else {
            alert("Job posted successfully!");
            setNewJob({
                title: '',
                company: '',
                location: '',
                experience_level: 'fresher',
                job_type: 'onsite',
                description: '',
                skills_required: ''
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-10 flex items-center gap-2">
                    <Settings className="text-primary" /> Admin Portal
                </h2>
                <nav className="space-y-4">
                    <button
                        onClick={() => setTab('jobs')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${tab === 'jobs' ? 'bg-primary' : 'hover:bg-slate-800'}`}
                    >
                        <PlusCircle size={20} /> Post Jobs
                    </button>
                    <button
                        onClick={() => setTab('users')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${tab === 'users' ? 'bg-primary' : 'hover:bg-slate-800'}`}
                    >
                        <Users size={20} /> Candidates
                    </button>
                    <button
                        onClick={() => setTab('stats')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${tab === 'stats' ? 'bg-primary' : 'hover:bg-slate-800'}`}
                    >
                        <BarChart size={20} /> Analytics
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                {tab === 'jobs' && (
                    <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">Post a New VLSI Opportunity</h3>
                        <form onSubmit={handlePostJob} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={newJob.title}
                                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={newJob.company}
                                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={newJob.location}
                                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Exp Level</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary bg-white"
                                        value={newJob.experience_level}
                                        onChange={(e) => setNewJob({ ...newJob, experience_level: e.target.value })}
                                    >
                                        <option value="fresher">Fresher</option>
                                        <option value="experienced">Experienced</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Job Type</label>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary bg-white"
                                        value={newJob.job_type}
                                        onChange={(e) => setNewJob({ ...newJob, job_type: e.target.value })}
                                    >
                                        <option value="onsite">Onsite</option>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Required Skills (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="Verilog, UVM, SystemVerilog..."
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                    value={newJob.skills_required}
                                    onChange={(e) => setNewJob({ ...newJob, skills_required: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Job Description</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                    value={newJob.description}
                                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-lg font-bold transition-all">
                                Publish Job
                            </button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;

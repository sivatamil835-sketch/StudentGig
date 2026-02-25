import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase_client';
import JobCard from '../components/JobCard';
import { Filter, Search } from 'lucide-react';

const JobBoard: React.FC = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        role: '',
        experience: '',
        location: ''
    });

    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const fetchJobs = async () => {
        setLoading(true);
        let query = supabase.from('jobs').select('*');

        if (filters.role) query = query.ilike('title', `%${filters.role}%`);
        if (filters.experience) query = query.eq('experience_level', filters.experience);
        if (filters.location) query = query.ilike('location', `%${filters.location}%`);

        const { data, error } = await query;
        if (!error) setJobs(data || []);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">VLSI Job Opportunities</h1>
                    <p className="text-slate-600 text-lg">Browse the latest roles in RTL, Verification, Physical Design, and more.</p>
                </header>

                {/* Search & Filters */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search roles like 'Verification Engineer'..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                            value={filters.role}
                            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                        />
                    </div>
                    <select
                        className="w-full md:w-48 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary bg-white"
                        value={filters.experience}
                        onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                    >
                        <option value="">Experience</option>
                        <option value="fresher">Fresher (0-2y)</option>
                        <option value="experienced">Experienced (2y+)</option>
                    </select>
                    <select
                        className="w-full md:w-48 px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-primary bg-white"
                        value={filters.location}
                        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    >
                        <option value="">Location</option>
                        <option value="onsite">Onsite</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Job List */}
                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        <div className="text-center py-20 text-slate-500">Loading opportunities...</div>
                    ) : jobs.length > 0 ? (
                        jobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                            <Filter className="mx-auto text-slate-300 mb-4" size={48} />
                            <p className="text-slate-500">No jobs found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobBoard;

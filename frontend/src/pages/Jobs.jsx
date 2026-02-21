import React, { useState, useEffect } from 'react';
import { supabase } from '../store/authStore';
import JobCard from '../components/JobCard';
import './Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        categories: [],
        type: 'Any'
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('jobs')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setJobs(data);
        setLoading(false);
    };

    const handleCategoryChange = (cat) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters({ categories: [], type: 'Any' });
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = filters.type === 'Any' || job.type === filters.type;
        // Simple category match: if no categories selected, show all. If some, check if any skill matches.
        const matchesCategory = filters.categories.length === 0 ||
            filters.categories.some(c => job.title.toLowerCase().includes(c.toLowerCase()));

        return matchesSearch && matchesType && matchesCategory;
    });

    return (
        <div className="jobs-page container py-4">
            <div className="jobs-header mb-4 text-center">
                <h1 className="page-title">Find Freelance Projects</h1>
                <p className="text-muted">Discover the best opportunities tailored for students.</p>
            </div>

            <div className="jobs-layout">
                {/* Filters Sidebar */}
                <aside className="filters-sidebar card">
                    <h3 className="mb-3">Filters</h3>

                    <div className="filter-group mb-4">
                        <label className="filter-label">Search Keywords</label>
                        <input
                            type="text"
                            className="input mt-2"
                            placeholder="e.g. React, Python..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-group mb-4">
                        <label className="filter-label">Category</label>
                        <div className="checkbox-list mt-2">
                            {['Web Development', 'UI/UX Design', 'Data Science', 'Content Writing'].map(cat => (
                                <label key={cat}>
                                    <input
                                        type="checkbox"
                                        checked={filters.categories.includes(cat)}
                                        onChange={() => handleCategoryChange(cat)}
                                    /> {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group mb-4">
                        <label className="filter-label">Work Type</label>
                        <select
                            className="input mt-2"
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                        >
                            <option value="Any">Any Type</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="On-site">On-site</option>
                        </select>
                    </div>

                    <button className="btn btn-outline btn-full" onClick={clearFilters}>Clear Filters</button>
                </aside>

                {/* Jobs Grid */}
                <div className="jobs-results">
                    <div className="results-header flex-between mb-4">
                        <span>Showing {filteredJobs.length} results</span>
                        <select className="input sort-select">
                            <option>Newest First</option>
                            <option>Budget (High to Low)</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="loading-state py-5 text-center">Loading jobs...</div>
                    ) : (
                        <div className="jobs-grid">
                            {filteredJobs.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>
                    )}

                    {!loading && filteredJobs.length === 0 && (
                        <div className="empty-state card py-5 text-center">
                            <p>No jobs found matching your criteria.</p>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={clearFilters}
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;

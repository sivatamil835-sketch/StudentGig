import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import './Jobs.css';

const dummyJobs = [
    { id: 1, title: 'React Frontend Developer', budget: '$200 - $500', duration: '2 weeks', skills: ['React', 'JavaScript', 'CSS'], type: 'Remote' },
    { id: 2, title: 'Python Backend Scripting', budget: '$100', duration: '3 days', skills: ['Python', 'FastAPI'], type: 'Remote' },
    { id: 3, title: 'UI/UX Design for Startup App', budget: '$300', duration: '1 month', skills: ['Figma', 'UI Design'], type: 'Remote' },
    { id: 4, title: 'Technical Blog Writer', budget: '$50 / post', duration: 'Ongoing', skills: ['Content Writing', 'SEO'], type: 'Remote' },
    { id: 5, title: 'Embedded C Programmer', budget: '$400', duration: '3 weeks', skills: ['Embedded C', 'IoT'], type: 'Hybrid' },
    { id: 6, title: 'Data Scraping & Analysis', budget: '$250', duration: '1 week', skills: ['Python', 'Pandas'], type: 'Remote' },
];

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = dummyJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="jobs-page container py-4">
            <div className="jobs-header mb-4">
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
                            <label><input type="checkbox" /> Web Development</label>
                            <label><input type="checkbox" /> UI/UX Design</label>
                            <label><input type="checkbox" /> Data Science</label>
                            <label><input type="checkbox" /> Content Writing</label>
                        </div>
                    </div>

                    <div className="filter-group mb-4">
                        <label className="filter-label">Project Duration</label>
                        <select className="input mt-2">
                            <option>Any Duration</option>
                            <option>Less than 1 week</option>
                            <option>1 to 4 weeks</option>
                            <option>1 to 3 months</option>
                        </select>
                    </div>

                    <button className="btn btn-outline btn-full">Clear Filters</button>
                </aside>

                {/* Jobs Grid */}
                <div className="jobs-results">
                    <div className="results-header flex-between mb-4">
                        <span>Showing {filteredJobs.length} results</span>
                        <select className="input sort-select">
                            <option>Most Relevant</option>
                            <option>Newest First</option>
                            <option>Budget (High to Low)</option>
                        </select>
                    </div>

                    <div className="jobs-grid">
                        {filteredJobs.map(job => (
                            <Link to={`/jobs/${job.id}`} key={job.id} className="job-card-link">
                                <JobCard job={job} />
                            </Link>
                        ))}
                    </div>

                    {filteredJobs.length === 0 && (
                        <div className="empty-state card">
                            <p>No jobs found matching your criteria. Try adjusting your filters.</p>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => setSearchTerm('')}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Jobs;

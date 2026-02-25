import React, { useState } from 'react';
import { MapPin, Building2, Clock, Briefcase } from 'lucide-react';
import { supabase } from '../supabase_client';

interface JobCardProps {
    job: {
        id: string;
        title: string;
        company: string;
        location: string;
        job_type: string;
        experience_level: string;
        skills_required: string[];
        created_at: string;
    };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);

    const handleApply = async () => {
        try {
            setApplying(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("Please login to apply");
                return;
            }

            const { error } = await supabase.from('applications').insert({
                user_id: user.id,
                job_id: job.id,
                status: 'applied'
            });

            if (error) {
                if (error.code === '23505') alert("You have already applied for this job!");
                else throw error;
            } else {
                setApplied(true);
                alert("Application submitted successfully!");
            }
        } catch (error: any) {
            alert("Error applying: " + error.message);
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-slate-600 font-medium mb-2">{job.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={16} /> {job.job_type}</span>
                            <span className="flex items-center gap-1"><Clock size={16} /> {new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleApply}
                        disabled={applying || applied}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-lg font-bold transition-all whitespace-nowrap"
                    >
                        {applying ? 'Applying...' : applied ? 'Applied!' : 'Apply Now'}
                    </button>
                    <button className="text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors">
                        View Details
                    </button>
                </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
                {job.skills_required?.slice(0, 5).map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                        {skill}
                    </span>
                ))}
                {job.skills_required?.length > 5 && (
                    <span className="text-xs text-slate-400 self-center">+{job.skills_required.length - 5} more</span>
                )}
            </div>
        </div>
    );
};

export default JobCard;

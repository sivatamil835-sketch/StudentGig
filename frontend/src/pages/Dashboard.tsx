import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase_client';
import { User, Briefcase, FileText, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(prof);

            const { data: apps } = await supabase.from('applications')
                .select('*, jobs(*)')
                .eq('user_id', user.id);
            setApplications(apps || []);
        }
        setLoading(false);
    };

    if (loading) return <div className="p-20 text-center">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar / Profile Summary */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
                                <User size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">{profile?.full_name}</h2>
                            <p className="text-slate-500 capitalize mb-6">{profile?.role}</p>
                            <div className="flex justify-center gap-4">
                                <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Applications</p>
                                    <p className="text-xl font-bold text-slate-900">{applications.length}</p>
                                </div>
                                <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase font-bold">Experience</p>
                                    <p className="text-xl font-bold text-slate-900">{profile?.experience_years}y</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-primary" /> Profile Completion
                            </h3>
                            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-4">
                                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                            </div>
                            <p className="text-sm text-slate-600">Update your skills and resume to increase job matches.</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Briefcase size={24} className="text-primary" /> Recent Applications
                            </h3>
                            {applications.length > 0 ? (
                                <div className="space-y-4">
                                    {applications.map(app => (
                                        <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                                            <div>
                                                <h4 className="font-bold text-slate-900">{app.jobs?.title}</h4>
                                                <p className="text-sm text-slate-500">{app.jobs?.company}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
                                                <CheckCircle size={16} /> Applied
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 text-slate-400">
                                    <p>You haven't applied to any jobs yet.</p>
                                    <button className="mt-4 text-primary font-bold hover:underline">Browse Jobs</button>
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 font-mono tracking-tight">Recommended Learning</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border border-slate-100 hover:border-primary/30 transition-colors cursor-pointer group">
                                    <h4 className="font-bold group-hover:text-primary transition-colors">Verilog & FPGA Design</h4>
                                    <p className="text-xs text-slate-500">Essential for RTL Engineers</p>
                                </div>
                                <div className="p-4 rounded-xl border border-slate-100 hover:border-primary/30 transition-colors cursor-pointer group">
                                    <h4 className="font-bold group-hover:text-primary transition-colors">SystemVerilog with UVM</h4>
                                    <p className="text-xs text-slate-500">Advanced Verification Methodology</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

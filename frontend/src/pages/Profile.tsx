import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase_client';
import { User, Mail, Phone, Globe, Linkedin, Github, Upload, CheckCircle, Briefcase, Code, Link as LinkIcon, Save } from 'lucide-react';

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `resumes/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('resumes')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('resumes')
                .getPublicUrl(filePath);

            setResumeUrl(publicUrl);
            setFormData({ ...formData, resume_url: publicUrl });
            alert("Resume uploaded successfully!");
        } catch (error: any) {
            alert("Error uploading resume: " + error.message);
        } finally {
            setUploading(false);
        }
    };
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        experience_years: 0,
        skills: [] as string[],
        linkedin_url: '',
        github_url: '',
        bio: '',
        resume_url: '',
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (data) {
                setProfile(data);
                setFormData({
                    full_name: data.full_name || '',
                    phone: data.phone || '',
                    experience_years: data.experience_years || 0,
                    skills: data.skills || [],
                    linkedin_url: data.linkedin_url || '',
                    github_url: data.github_url || '',
                    bio: data.bio || '',
                    resume_url: data.resume_url || ''
                });
            }
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { error } = await supabase.from('profiles').update(formData).eq('id', user.id);
            if (error) alert(error.message);
            else alert("Profile updated successfully!");
        }
        setSaving(false);
    };

    if (loading) return <div className="p-20 text-center">Loading Profile...</div>;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="h-32 bg-primary"></div>
                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-8">
                            <div className="w-32 h-32 bg-white rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border-4 border-white">
                                    <User size={64} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <User size={16} /> Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Phone size={16} /> Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Briefcase size={16} /> Years of Experience
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.experience_years}
                                        onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <Code size={16} /> Skills (comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.skills.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                                        <LinkIcon size={16} /> LinkedIn / Portfolio
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-primary"
                                        value={formData.linkedin_url}
                                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2 text-primary">
                                        <Upload size={16} /> Resume Upload (PDF)
                                    </label>
                                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-8 hover:border-primary cursor-pointer transition-colors bg-slate-50">
                                        <Upload className="text-primary mb-2" size={32} />
                                        <span className="text-slate-900 font-bold mb-1">
                                            {uploading ? 'Uploading...' : 'Upload Resume'}
                                        </span>
                                        <p className="text-slate-400 text-sm">PDF, DOCX (Max 5MB)</p>
                                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                    {formData.resume_url && (
                                        <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                                            <CheckCircle size={16} /> Resume ready to save!
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-slate-100 pt-8 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                            >
                                <Save size={20} /> {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

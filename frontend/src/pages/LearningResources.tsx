import React from 'react';
import { Book, Cpu, Layers, Zap } from 'lucide-react';

const LearningResources: React.FC = () => {
    const resources = [
        {
            title: "Digital Electronics Basics",
            description: "Foundational concepts for VLSI, including Logic Gates, K-Maps, and FSMs.",
            icon: <Zap className="text-yellow-500" />,
            level: "Beginner"
        },
        {
            title: "Verilog HDL Masterclass",
            description: "Learn to model hardware using Verilog. Coverage includes RTL & Testbenches.",
            icon: <Cpu className="text-primary" />,
            level: "Intermediate"
        },
        {
            title: "SystemVerilog for Verification",
            description: "Master Object Oriented Programming and functional coverage in SystemVerilog.",
            icon: <Layers className="text-secondary" />,
            level: "Advanced"
        },
        {
            title: "ASIC Design Flow",
            description: "Comprehensive guide to the complete ASIC cycle from RTL to GDSII.",
            icon: <Book className="text-purple-500" />,
            level: "Intermediate"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="container mx-auto max-w-6xl">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">VLSI Learning Resources</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">Enhance your skills with our curated list of tutorials, documentation, and industry best practices.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {resources.map((res, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {res.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{res.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-3">{res.description}</p>
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${res.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                        res.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                    }`}>
                                    {res.level}
                                </span>
                                <button className="text-primary font-bold text-sm hover:underline">Start Learning</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-slate-900 text-white p-12 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Want specialized VLSI mentoring?</h2>
                        <p className="text-slate-400 mb-8 max-w-xl">Join our exclusive Discord community where senior designers from top firms mentor fresh talent.</p>
                        <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all">
                            Apply for Mentorship
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearningResources;

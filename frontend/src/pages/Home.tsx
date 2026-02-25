import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, UserCheck, BookOpen, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center"></div>
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        Build Your Career in <span className="text-primary">VLSI & Semiconductors</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
                    >
                        Connecting the next generation of hardware engineers with top semiconductor leaders worldwide.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <Link to="/jobs" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2">
                            <Search size={20} /> Find VLSI Jobs
                        </Link>
                        <Link to="/register" className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2">
                            <UserCheck size={20} /> Upload Resume
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Sectors */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16 text-slate-900">Popular VLSI Roles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {[
                            "RTL Design", "Verification", "Physical Design", "DFT", "FPGA"
                        ].map((role) => (
                            <div key={role} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center border border-slate-200">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="font-semibold text-slate-900">{role}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Audiences */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-slate-900 text-white p-10 rounded-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">For Students</h3>
                                <p className="text-slate-300 mb-6">Kickstart your semiconductor career with internships and entry-level RTL/Verification roles.</p>
                                <Link to="/register" className="text-primary font-semibold hover:underline flex items-center gap-2">
                                    Join as Student <Search size={16} />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-primary text-white p-10 rounded-2xl relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4">For Professionals</h3>
                                <p className="text-white/80 mb-6">Explore senior roles in Physical Design, Analog, and DFT with top global firms.</p>
                                <Link to="/register" className="text-white font-semibold hover:underline flex items-center gap-2">
                                    Advanced Roles <Search size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

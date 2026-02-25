import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                    <Cpu className="text-primary" size={32} />
                    <span>VLSI<span className="text-primary">Hub</span></span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/jobs" className="hover:text-primary transition-colors">Jobs</Link>
                    <Link to="/learning" className="hover:text-primary transition-colors">Resources</Link>
                    <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
                    <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
                    <Link to="/register" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-medium transition-all">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

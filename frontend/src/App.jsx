import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Chat from './pages/Chat';
import PostJob from './pages/PostJob';
import useAuthStore from './store/authStore';

function App() {
    const { loadSession } = useAuthStore();

    useEffect(() => {
        loadSession();
    }, []);

    return (
        <Router>
            <div className="app-layout">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/student-dashboard" element={<StudentDashboard />} />
                        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                        <Route path="/jobs" element={<Jobs />} />
                        <Route path="/jobs/:id" element={<JobDetails />} />
                        <Route path="/chat" element={<Chat />} />
                        <Route path="/post-job" element={<PostJob />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

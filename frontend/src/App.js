import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/common/Footer';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import StudentMonitoring from './components/student/Monitoring';
import StudentRating from './components/student/Rating';

// Lecturer Components
import LecturerDashboard from './components/lecturer/LecturerDashboard';
import LecturerClasses from './components/lecturer/Classes';
import LecturerReports from './components/lecturer/Reports';
import ReportForm from './components/lecturer/ReportForm';
import LecturerMonitoring from './components/lecturer/Monitoring';
import LecturerRating from './components/lecturer/Rating';

// Principal Lecturer Components
import PRLDashboard from './components/principal-lecturer/PRLDashboard';
import PRLCourses from './components/principal-lecturer/Courses';
import PRLReports from './components/principal-lecturer/Reports';
import PRLMonitoring from './components/principal-lecturer/Monitoring';
import PRLRating from './components/principal-lecturer/Rating';
import PRLClasses from './components/principal-lecturer/Classes';

// Program Leader Components
import PLDashboard from './components/program-leader/PLDashboard';
import PLCourses from './components/program-leader/Courses';
import PLReports from './components/program-leader/Reports';
import PLMonitoring from './components/program-leader/Monitoring';
import PLClasses from './components/program-leader/Classes';
import PLLectures from './components/program-leader/Lectures';
import PLRating from './components/program-leader/Rating';

import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Student Routes */}
                        <Route path="/student/dashboard" element={<StudentDashboard />} />
                        <Route path="/student/monitoring" element={<StudentMonitoring />} />
                        <Route path="/student/rating" element={<StudentRating />} />
                        
                        {/* Lecturer Routes */}
                        <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
                        <Route path="/lecturer/classes" element={<LecturerClasses />} />
                        <Route path="/lecturer/reports" element={<LecturerReports />} />
                        <Route path="/lecturer/report-form" element={<ReportForm />} />
                        <Route path="/lecturer/monitoring" element={<LecturerMonitoring />} />
                        <Route path="/lecturer/rating" element={<LecturerRating />} />
                        
                        {/* Principal Lecturer Routes */}
                        <Route path="/principal-lecturer/dashboard" element={<PRLDashboard />} />
                        <Route path="/principal-lecturer/courses" element={<PRLCourses />} />
                        <Route path="/principal-lecturer/reports" element={<PRLReports />} />
                        <Route path="/principal-lecturer/monitoring" element={<PRLMonitoring />} />
                        <Route path="/principal-lecturer/rating" element={<PRLRating />} />
                        <Route path="/principal-lecturer/classes" element={<PRLClasses />} />
                        
                        {/* Program Leader Routes */}
                        <Route path="/program-leader/dashboard" element={<PLDashboard />} />
                        <Route path="/program-leader/courses" element={<PLCourses />} />
                        <Route path="/program-leader/reports" element={<PLReports />} />
                        <Route path="/program-leader/monitoring" element={<PLMonitoring />} />
                        <Route path="/program-leader/classes" element={<PLClasses />} />
                        <Route path="/program-leader/lectures" element={<PLLectures />} />
                        <Route path="/program-leader/rating" element={<PLRating />} />
                    </Routes>
                </div>
                
                {/* Footer - appears on all pages */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
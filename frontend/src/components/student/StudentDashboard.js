import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function StudentDashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Student Dashboard</h1>
                    <p>Welcome, {user.firstName} {user.lastName}</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>My Dashboard</h3>
                            <p>Overview of your activities</p>
                            <Link to="/student/dashboard" className="dashboard-link">
                                View Dashboard
                            </Link>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Monitoring</h3>
                            <p>View class activities and reports</p>
                            <Link to="/student/monitoring" className="dashboard-link">
                                View Monitoring
                            </Link>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Rating</h3>
                            <p>Rate lecturers and provide feedback</p>
                            <Link to="/student/rating" className="dashboard-link primary">
                                Rate Lecturers
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="recent-activity">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <Link to="/student/rating" className="action-btn primary">
                            Rate Your Lecturers
                        </Link>
                        <Link to="/student/monitoring" className="action-btn secondary">
                            View Class Reports
                        </Link>
                    </div>
                </div>

                <div className="dashboard-notes">
                    <h3>Welcome to LUCT Reporting System</h3>
                    <p>As a student, you can:</p>
                    <ul>
                        <li>Monitor class activities and lecturer reports</li>
                        <li>Rate your lecturers and provide feedback</li>
                        <li>View your class schedules and attendance</li>
                    </ul>
                    <p>Your feedback helps improve the quality of education.</p>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
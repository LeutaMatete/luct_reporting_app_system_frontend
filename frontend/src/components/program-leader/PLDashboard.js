import React from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import './Dashboard.css';

function PLDashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Program Leader Dashboard</h1>
                    <p>Welcome, {user.firstName}! Manage courses and program activities.</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                    
                        <div className="stat-info">
                            <h3>Courses</h3>
                            <p>Add & assign lecture modules</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        
                        <div className="stat-info">
                            <h3>Reports</h3>
                            <p>View reports from PRL</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                       
                        <div className="stat-info">
                            <h3>Monitoring</h3>
                            <p>Monitor program performance</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                       
                        <div className="stat-info">
                            <h3>Classes</h3>
                            <p>Manage class assignments</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        
                        <div className="stat-info">
                            <h3>Lectures</h3>
                            <p>Oversee lecture schedules</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Rating</h3>
                            <p>View program ratings</p>
                        </div>
                    </div>
                </div>

                <div className="recent-activity">
                    <h2>Program Overview</h2>
                    <div className="program-stats">
                        <div className="program-stat">
                            <strong>Active Courses:</strong> 12
                        </div>
                        <div className="program-stat">
                            <strong>Lecturers:</strong> 8
                        </div>
                        <div className="program-stat">
                            <strong>Students:</strong> 240
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PLDashboard;
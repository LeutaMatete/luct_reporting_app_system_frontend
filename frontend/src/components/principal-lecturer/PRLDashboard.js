import React from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import './Dashboard.css';

function PRLDashboard() {

    
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Principal Lecturer Dashboard</h1>
                    <p>Welcome, {user.firstName}! Oversee courses and review reports.</p>
                </div>



                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Courses</h3>
                            <p>View courses under your stream</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Reports</h3>
                            <p>Review lecture reports & add feedback</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Monitoring</h3>
                            <p>Monitor academic activities</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Rating</h3>
                            <p>View ratings and performance</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Classes</h3>
                            <p>Oversee class activities</p>
                        </div>
                    </div>
                </div>

                <div className="recent-activity">
                    <h2>Pending Reviews</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="activity-desc">Web Development Report - Week 6</span>
                            <button className="review-btn">Review</button>
                        </div>
                        <div className="activity-item">
                            <span className="activity-desc">Database Systems Report - Week 6</span>
                            <button className="review-btn">Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PRLDashboard;
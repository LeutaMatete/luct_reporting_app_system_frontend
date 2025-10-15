import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function LecturerDashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [ratingStats, setRatingStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRatingStatistics();
    }, []);

    const fetchRatingStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/ratings/statistics', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setRatingStats(data.statistics);
            }
        } catch (error) {
            console.error('Fetch rating statistics error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Lecturer Dashboard</h1>
                    <p>Welcome back, {user.firstName} {user.lastName}</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>My Classes</h3>
                            <p>Manage your assigned classes</p>
                            <Link to="/lecturer/classes" className="dashboard-link">
                                View Classes
                            </Link>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Reports</h3>
                            <p>Submit and view lecture reports</p>
                            <div className="dashboard-links">
                                <Link to="/lecturer/report-form" className="dashboard-link primary">
                                    Create Report
                                </Link>
                                <Link to="/lecturer/reports" className="dashboard-link">
                                    View Reports
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Student Ratings</h3>
                            <p>
                                Average: {ratingStats.average_rating ? parseFloat(ratingStats.average_rating).toFixed(1) : '0.0'}/5
                            </p>
                            <p>Total: {ratingStats.total_ratings || 0} ratings</p>
                            <Link to="/lecturer/rating" className="dashboard-link primary">
                                View Ratings
                            </Link>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Monitoring</h3>
                            <p>Track student attendance</p>
                            <Link to="/lecturer/monitoring" className="dashboard-link">
                                View Monitoring
                            </Link>
                        </div>
                    </div>
                </div>

                {!loading && ratingStats.total_ratings > 0 && (
                    <div className="rating-highlight">
                        <h3>Your Performance Overview</h3>
                        <div className="rating-breakdown-small">
                            <div className="rating-item">
                                <span className="stars">★★★★★</span>
                                <span className="count">{ratingStats.five_star || 0}</span>
                            </div>
                            <div className="rating-item">
                                <span className="stars">★★★★</span>
                                <span className="count">{ratingStats.four_star || 0}</span>
                            </div>
                            <div className="rating-item">
                                <span className="stars">★★★</span>
                                <span className="count">{ratingStats.three_star || 0}</span>
                            </div>
                            <div className="rating-item">
                                <span className="stars">★★</span>
                                <span className="count">{ratingStats.two_star || 0}</span>
                            </div>
                            <div className="rating-item">
                                <span className="stars">★</span>
                                <span className="count">{ratingStats.one_star || 0}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LecturerDashboard;
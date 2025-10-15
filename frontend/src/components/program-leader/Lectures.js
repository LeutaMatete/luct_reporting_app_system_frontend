import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Lectures() {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setLecturers([]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="loading">Loading lecturer information...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Lecturer Management</h1>
                    <p>Manage lecturer assignments and oversee teaching staff</p>
                </div>

                <div className="lecturers-section">
                    <div className="section-header">
                        <h2>Teaching Staff</h2>
                    </div>

                    {lecturers.length === 0 ? (
                        <div className="no-data">
                            <p>No lecturers available yet.</p>
                            <p>Lecturer information will appear here once staff are registered.</p>
                        </div>
                    ) : (
                        <div className="lecturers-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Assigned Courses</th>
                                        <th>Total Classes</th>
                                        <th>Average Rating</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lecturers.map((lecturer, index) => (
                                        <tr key={index}>
                                            <td>{lecturer.name}</td>
                                            <td>{lecturer.email}</td>
                                            <td>{lecturer.assigned_courses}</td>
                                            <td>{lecturer.total_classes}</td>
                                            <td>{lecturer.average_rating}/5</td>
                                            <td>
                                                <span className={`status ${lecturer.status}`}>
                                                    {lecturer.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-btn primary">View Profile</button>
                                                <button className="action-btn secondary">Assign Course</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="lecturer-stats">
                    <h3>Lecturer Performance Overview</h3>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Total Lecturers</h3>
                                <p className="stat-number">0</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Active This Week</h3>
                                <p className="stat-number">0</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Avg. Performance</h3>
                                <p className="stat-number">0.0</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Training Needed</h3>
                                <p className="stat-number">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lectures;
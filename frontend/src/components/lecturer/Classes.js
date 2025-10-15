import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        // Simulate loading classes data
        setTimeout(() => {
            setClasses([]); // Empty array since no classes are assigned yet
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            <div className="dashboard-content">
                <div className="loading">Loading classes...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>My Classes</h1>
                    <p>Manage your assigned classes and teaching schedule</p>
                </div>

                <div className="classes-section">
                    <div className="section-header">
                        <h2>Assigned Classes</h2>
                    </div>

                    {classes.length === 0 ? (
                        <div className="no-data">
                            <p>No classes assigned to you yet.</p>
                            <p>Please contact your Program Leader for class assignments.</p>
                        </div>
                    ) : (
                        <div className="classes-grid">
                            {classes.map(classItem => (
                                <div key={classItem.id} className="class-card">
                                    <h3>{classItem.course_name}</h3>
                                    <div className="class-details">
                                        <p><strong>Class:</strong> {classItem.class_name}</p>
                                        <p><strong>Code:</strong> {classItem.course_code}</p>
                                        <p><strong>Venue:</strong> {classItem.venue}</p>
                                        <p><strong>Time:</strong> {classItem.scheduled_time}</p>
                                        <p><strong>Students:</strong> {classItem.total_students}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button className="action-btn primary" disabled>
                            Request Class Assignment
                        </button>
                        <button className="action-btn secondary" disabled>
                            View Teaching Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classes;
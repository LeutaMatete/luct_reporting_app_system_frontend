import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setClasses([]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="loading">Loading class information...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Class Management</h1>
                    <p>Manage class assignments and schedules across the program</p>
                </div>

                <div className="classes-section">
                    <div className="section-header">
                        <h2>All Classes</h2>
                    </div>

                    {classes.length === 0 ? (
                        <div className="no-data">
                            <p>No classes available yet.</p>
                            <p>Classes will appear here once courses are assigned and scheduled.</p>
                        </div>
                    ) : (
                        <div className="classes-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Class Name</th>
                                        <th>Course</th>
                                        <th>Lecturer</th>
                                        <th>Schedule</th>
                                        <th>Venue</th>
                                        <th>Students</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classes.map((classItem, index) => (
                                        <tr key={index}>
                                            <td>{classItem.class_name}</td>
                                            <td>{classItem.course_name}</td>
                                            <td>{classItem.lecturer_name}</td>
                                            <td>{classItem.schedule}</td>
                                            <td>{classItem.venue}</td>
                                            <td>{classItem.students}</td>
                                            <td>
                                                <span className={`status ${classItem.status}`}>
                                                    {classItem.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-btn primary">Edit</button>
                                                <button className="action-btn secondary">View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="class-management">
                    <h3>Class Management Tools</h3>
                    <div className="management-actions">
                        <button className="action-btn primary">Create New Class</button>
                        <button className="action-btn secondary">Bulk Assign Classes</button>
                        <button className="action-btn secondary">Generate Timetable</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classes;
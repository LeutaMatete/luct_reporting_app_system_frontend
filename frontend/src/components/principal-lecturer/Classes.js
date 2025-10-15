import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Classes() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading classes data
        setTimeout(() => {
            setClasses([]); // Will be empty until data is available
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            <div className="dashboard-content">
                <div className="loading">Loading classes data...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Class Oversight</h1>
                    <p>Oversee class activities and teaching schedules in your stream</p>
                </div>

                <div className="classes-section">
                    <div className="section-header">
                        <h2>Class Schedule Overview</h2>
                    </div>

                    {classes.length === 0 ? (
                        <div className="no-data">
                            <p>No class data available yet.</p>
                            <p>Class information will appear here once courses are assigned to your stream.</p>
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
                                                <button className="action-btn primary">View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="oversight-info">
                    <h3>Class Oversight Responsibilities</h3>
                    <p>As Principal Lecturer, your class oversight duties include:</p>
                    <ul>
                        <li>Monitoring class schedules and timetables</li>
                        <li>Ensuring appropriate venue allocation</li>
                        <li>Tracking student enrollment numbers</li>
                        <li>Overseeing class resource allocation</li>
                        <li>Addressing scheduling conflicts</li>
                        <li>Ensuring teaching facilities meet requirements</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Classes;
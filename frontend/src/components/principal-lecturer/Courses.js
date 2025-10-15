import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading courses data
        setTimeout(() => {
            setCourses([]); // Will be empty until data is available
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            <div className="dashboard-content">
                <div className="loading">Loading courses...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Courses Under My Stream</h1>
                    <p>View all courses and lectures under your supervision</p>
                </div>

                <div className="courses-section">
                    <div className="section-header">
                        <h2>Course Overview</h2>
                    </div>

                    {courses.length === 0 ? (
                        <div className="no-data">
                            <p>No courses assigned to your stream yet.</p>
                            <p>Courses will appear here once assigned by the Program Leader.</p>
                        </div>
                    ) : (
                        <div className="courses-grid">
                            {courses.map(course => (
                                <div key={course.id} className="course-card">
                                    <h3>{course.course_name}</h3>
                                    <div className="course-details">
                                        <p><strong>Course Code:</strong> {course.course_code}</p>
                                        <p><strong>Lecturer:</strong> {course.lecturer_name}</p>
                                        <p><strong>Students:</strong> {course.total_students}</p>
                                        <p><strong>Status:</strong> {course.status}</p>
                                    </div>
                                    <div className="course-actions">
                                        <button className="action-btn primary">View Details</button>
                                        <button className="action-btn secondary">View Reports</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="stream-info">
                    <h3>Stream Information</h3>
                    <p>As a Principal Lecturer, you oversee the academic quality and delivery of courses within your assigned stream.</p>
                    <ul>
                        <li>Review course content and teaching materials</li>
                        <li>Monitor lecturer performance and student feedback</li>
                        <li>Ensure compliance with academic standards</li>
                        <li>Provide guidance and support to lecturers</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Courses;
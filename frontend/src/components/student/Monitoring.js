import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Monitoring() {
    const [classReports, setClassReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchClassReports();
    }, []);

    const fetchClassReports = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/reports/student', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setClassReports(data.reports);
            } else {
                setError(data.message || 'Failed to fetch class reports');
            }
        } catch (error) {
            console.error('Fetch class reports error:', error);
            setError('Failed to fetch class reports. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const rateLecturer = (reportId, lecturerId, lecturerName, courseName) => {
        // Store the report info for rating and redirect to rating page
        const ratingInfo = {
            reportId,
            lecturerId, 
            lecturerName,
            courseName
        };
        localStorage.setItem('pendingRating', JSON.stringify(ratingInfo));
        window.location.href = '/student/rating';
    };

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="student" />
            <div className="dashboard-content">
                <div className="loading">Loading class reports...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="student" />
            <div className="dashboard-content">
                <div className="error-message">{error}</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="student" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Class Monitoring</h1>
                    <p>View lecturer reports and provide feedback</p>
                </div>

                <div className="monitoring-section">
                    <div className="section-header">
                        <h2>Recent Class Reports</h2>
                        <p>Rate lecturers based on their submitted reports</p>
                    </div>

                    {classReports.length === 0 ? (
                        <div className="no-data">
                            <p>No class reports available yet.</p>
                            <p>Lecturers will submit reports that will appear here.</p>
                        </div>
                    ) : (
                        <div className="reports-list">
                            {classReports.map((report) => (
                                <div key={report.id} className="report-card">
                                    <div className="report-header">
                                        <h3>{report.course_name} - {report.class_name}</h3>
                                        <span className="report-date">
                                            {new Date(report.date_of_lecture).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="report-details">
                                        <p><strong>Lecturer:</strong> {report.lecturer_name}</p>
                                        <p><strong>Week:</strong> {report.week_of_reporting}</p>
                                        <p><strong>Topic:</strong> {report.topic_taught}</p>
                                        <p><strong>Attendance:</strong> {report.actual_students_present}/{report.total_registered_students}</p>
                                        <p><strong>Venue:</strong> {report.venue}</p>
                                        <p><strong>Time:</strong> {report.scheduled_lecture_time}</p>
                                    </div>
                                    <div className="learning-outcomes">
                                        <strong>Learning Outcomes:</strong>
                                        <p>{report.learning_outcomes}</p>
                                    </div>
                                    {report.lecturer_recommendations && (
                                        <div className="recommendations">
                                            <strong>Lecturer Recommendations:</strong>
                                            <p>{report.lecturer_recommendations}</p>
                                        </div>
                                    )}
                                    <div className="report-actions">
                                        <button 
                                            className="action-btn primary"
                                            onClick={() => rateLecturer(
                                                report.id,
                                                report.lecturer_id,
                                                report.lecturer_name,
                                                report.course_name
                                            )}
                                        >
                                            Rate This Lecturer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Monitoring;
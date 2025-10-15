import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Reports() {
    const [reports, setReports] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setReports([]);
            setFeedbacks([]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="loading">Loading reports and feedback...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Reports and Feedback</h1>
                    <p>View reports from Principal Lecturers and overall feedback</p>
                </div>

                <div className="reports-section">
                    <div className="section-header">
                        <h2>Principal Lecturer Reports</h2>
                    </div>

                    {reports.length === 0 ? (
                        <div className="no-data">
                            <p>No reports available from Principal Lecturers yet.</p>
                            <p>Reports will appear here once Principal Lecturers review and submit them.</p>
                        </div>
                    ) : (
                        <div className="reports-list">
                            {reports.map(report => (
                                <div key={report.id} className="report-card">
                                    <div className="report-header">
                                        <h3>{report.course_name} - Review Report</h3>
                                        <span className="report-date">{report.review_date}</span>
                                    </div>
                                    <div className="report-details">
                                        <p><strong>Principal Lecturer:</strong> {report.prl_name}</p>
                                        <p><strong>Course:</strong> {report.course_name}</p>
                                        <p><strong>Lecturer:</strong> {report.lecturer_name}</p>
                                        <p><strong>Status:</strong> {report.review_status}</p>
                                    </div>
                                    <div className="feedback-content">
                                        <strong>Feedback:</strong>
                                        <p>{report.feedback_text}</p>
                                    </div>
                                    <div className="report-actions">
                                        <button className="action-btn primary">View Details</button>
                                        <button className="action-btn secondary">Download Report</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="feedback-section">
                    <div className="section-header">
                        <h2>Overall Program Feedback</h2>
                    </div>

                    {feedbacks.length === 0 ? (
                        <div className="no-data">
                            <p>No program feedback available yet.</p>
                            <p>Feedback from students and lecturers will appear here.</p>
                        </div>
                    ) : (
                        <div className="feedback-stats">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h3>Overall Program Rating</h3>
                                    <div className="rating-score">0.0</div>
                                    <div className="rating-scale">out of 5</div>
                                </div>
                                <div className="stat-card">
                                    <h3>Total Feedback</h3>
                                    <div className="stat-number">0</div>
                                    <p>Comments received</p>
                                </div>
                                <div className="stat-card">
                                    <h3>Courses Rated</h3>
                                    <div className="stat-number">0</div>
                                    <p>Active courses</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="program-insights">
                    <h3>Program Insights</h3>
                    <p>Use this information to:</p>
                    <ul>
                        <li>Monitor program quality and teaching standards</li>
                        <li>Identify areas for curriculum improvement</li>
                        <li>Make data-driven decisions for program development</li>
                        <li>Track lecturer performance and development needs</li>
                        <li>Ensure compliance with academic standards</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Reports;
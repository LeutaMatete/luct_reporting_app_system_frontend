import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Reports() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading reports data
        setTimeout(() => {
            setReports([]); // Will be empty until data is available
            setLoading(false);
        }, 1000);
    }, []);

    const handleAddFeedback = (reportId) => {
        if (!feedback.trim()) {
            alert('Please enter feedback before submitting.');
            return;
        }

        // Simulate adding feedback
        console.log(`Adding feedback to report ${reportId}:`, feedback);
        alert('Feedback submitted successfully!');
        setFeedback('');
        setSelectedReport(null);
    };

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            <div className="dashboard-content">
                <div className="loading">Loading reports...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Lecture Reports Review</h1>
                    <p>View lecture reports and provide feedback to lecturers</p>
                </div>

                <div className="reports-section">
                    <div className="section-header">
                        <h2>Pending Review</h2>
                    </div>

                    {reports.length === 0 ? (
                        <div className="no-data">
                            <p>No reports pending review.</p>
                            <p>Lecture reports from lecturers in your stream will appear here for review.</p>
                        </div>
                    ) : (
                        <div className="reports-list">
                            {reports.map(report => (
                                <div key={report.id} className="report-card">
                                    <div className="report-header">
                                        <h3>{report.course_name} - {report.class_name}</h3>
                                        <span className="report-date">{report.date}</span>
                                    </div>
                                    <div className="report-details">
                                        <p><strong>Lecturer:</strong> {report.lecturer_name}</p>
                                        <p><strong>Week:</strong> {report.week}</p>
                                        <p><strong>Attendance:</strong> {report.present}/{report.total}</p>
                                        <p><strong>Topic:</strong> {report.topic}</p>
                                    </div>
                                    <div className="report-actions">
                                        <button 
                                            className="action-btn primary"
                                            onClick={() => setSelectedReport(report)}
                                        >
                                            Add Feedback
                                        </button>
                                        <button className="action-btn secondary">
                                            View Full Report
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedReport && (
                    <div className="feedback-modal">
                        <div className="modal-content">
                            <h3>Add Feedback for {selectedReport.course_name}</h3>
                            <div className="report-summary">
                                <p><strong>Lecturer:</strong> {selectedReport.lecturer_name}</p>
                                <p><strong>Date:</strong> {selectedReport.date}</p>
                                <p><strong>Topic:</strong> {selectedReport.topic}</p>
                            </div>
                            <div className="feedback-form">
                                <label htmlFor="feedback">Your Feedback:</label>
                                <textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Provide constructive feedback, suggestions, or approvals..."
                                    rows="6"
                                />
                                <div className="form-actions">
                                    <button 
                                        className="action-btn primary"
                                        onClick={() => handleAddFeedback(selectedReport.id)}
                                    >
                                        Submit Feedback
                                    </button>
                                    <button 
                                        className="action-btn secondary"
                                        onClick={() => {
                                            setSelectedReport(null);
                                            setFeedback('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="review-guidelines">
                    <h3>Review Guidelines</h3>
                    <ul>
                        <li>Review reports for completeness and accuracy</li>
                        <li>Provide constructive feedback to help lecturers improve</li>
                        <li>Focus on teaching methodology and student engagement</li>
                        <li>Ensure compliance with curriculum standards</li>
                        <li>Approve reports that meet quality standards</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Reports;
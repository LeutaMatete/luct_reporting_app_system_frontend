import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reports.css';

function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/reports/lecturer', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setReports(data.reports);
            } else {
                setError(data.message || 'Failed to fetch reports');
            }
        } catch (error) {
            console.error('Fetch reports error:', error);
            setError('Failed to fetch reports');
        } finally {
            setLoading(false);
        }
    };

    const deleteReport = async (reportId) => {
        if (!window.confirm('Are you sure you want to delete this report?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/reports/${reportId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setReports(reports.filter(report => report.id !== reportId));
            } else {
                setError(data.message || 'Failed to delete report');
            }
        } catch (error) {
            console.error('Delete report error:', error);
            setError('Failed to delete report');
        }
    };

    if (loading) return <div className="loading">Loading reports...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="reports-container">
            <div className="reports-header">
                <h1>My Reports</h1>
                <Link to="/lecturer/report-form" className="new-report-btn">
                    Create New Report
                </Link>
            </div>

            {reports.length === 0 ? (
                <div className="no-reports">
                    <p>No reports found. Create your first report to get started.</p>
                    <Link to="/lecturer/report-form" className="new-report-btn">
                        Create First Report
                    </Link>
                </div>
            ) : (
                <div className="reports-list">
                    {reports.map((report) => (
                        <div key={report.id} className="report-card">
                            <div className="report-header">
                                <h3>{report.course_name} - {report.class_name}</h3>
                                <div className="report-actions">
                                    <button 
                                        className="delete-btn"
                                        onClick={() => deleteReport(report.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="report-details">
                                <div className="detail-row">
                                    <span className="detail-label">Week:</span>
                                    <span className="detail-value">{report.week_of_reporting}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Date:</span>
                                    <span className="detail-value">{new Date(report.date_of_lecture).toLocaleDateString()}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Venue:</span>
                                    <span className="detail-value">{report.venue}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Attendance:</span>
                                    <span className="detail-value">{report.actual_students_present} / {report.total_registered_students}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Topic:</span>
                                    <span className="detail-value">{report.topic_taught}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Reports;
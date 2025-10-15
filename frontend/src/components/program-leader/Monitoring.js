import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Monitoring() {
    const [monitoringData, setMonitoringData] = useState([]);
    const [programStats, setProgramStats] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => {
            setMonitoringData([]);
            setProgramStats({
                totalCourses: 0,
                activeLecturers: 0,
                totalStudents: 0,
                reportCompletion: 0
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="loading">Loading program monitoring data...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Program Monitoring</h1>
                    <p>Monitor overall program performance and activities</p>
                </div>

                <div className="program-stats">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Total Courses</h3>
                                <p className="stat-number">{programStats.totalCourses}</p>
                                <p>In program</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Active Lecturers</h3>
                                <p className="stat-number">{programStats.activeLecturers}</p>
                                <p>Teaching staff</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Total Students</h3>
                                <p className="stat-number">{programStats.totalStudents}</p>
                                <p>Enrolled</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-info">
                                <h3>Report Completion</h3>
                                <p className="stat-number">{programStats.reportCompletion}%</p>
                                <p>This week</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="monitoring-section">
                    <div className="section-header">
                        <h2>Program Activity Overview</h2>
                    </div>

                    {monitoringData.length === 0 ? (
                        <div className="no-data">
                            <p>No monitoring data available yet.</p>
                            <p>Program activity data will appear here once the system is active.</p>
                        </div>
                    ) : (
                        <div className="monitoring-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Lecturer</th>
                                        <th>Last Report</th>
                                        <th>Student Rating</th>
                                        <th>Attendance Rate</th>
                                        <th>PRL Feedback</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monitoringData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.course_name}</td>
                                            <td>{item.lecturer_name}</td>
                                            <td>{item.last_report}</td>
                                            <td>{item.student_rating}/5</td>
                                            <td>{item.attendance_rate}%</td>
                                            <td>{item.prl_feedback}</td>
                                            <td>
                                                <span className={`status ${item.status}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="key-metrics">
                    <h3>Key Performance Indicators</h3>
                    <div className="metrics-grid">
                        <div className="metric-item">
                            <span className="metric-label">Teaching Quality Score:</span>
                            <span className="metric-value">0.0/5.0</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Student Satisfaction:</span>
                            <span className="metric-value">0%</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Report Submission Rate:</span>
                            <span className="metric-value">0%</span>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Course Completion:</span>
                            <span className="metric-value">0%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Monitoring;
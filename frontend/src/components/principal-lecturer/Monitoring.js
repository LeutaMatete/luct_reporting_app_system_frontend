import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Monitoring() {
    const [monitoringData, setMonitoringData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading monitoring data
        setTimeout(() => {
            setMonitoringData([]); // Will be empty until data is available
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            <div className="dashboard-content">
                <div className="loading">Loading monitoring data...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Academic Monitoring</h1>
                    <p>Monitor teaching activities and academic performance in your stream</p>
                </div>

                <div className="monitoring-stats">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Total Courses</h3>
                            <p className="stat-number">0</p>
                            <p>Under supervision</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Active Lecturers</h3>
                            <p className="stat-number">0</p>
                            <p>In your stream</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Reports Submitted</h3>
                            <p className="stat-number">0</p>
                            <p>This week</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Average Rating</h3>
                            <p className="stat-number">0.0</p>
                            <p>Stream performance</p>
                        </div>
                    </div>
                </div>

                <div className="monitoring-section">
                    <div className="section-header">
                        <h2>Teaching Activity Overview</h2>
                    </div>

                    {monitoringData.length === 0 ? (
                        <div className="no-data">
                            <p>No monitoring data available yet.</p>
                            <p>Teaching activity data will appear here once lecturers start submitting reports.</p>
                        </div>
                    ) : (
                        <div className="monitoring-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Lecturer</th>
                                        <th>Course</th>
                                        <th>Last Report</th>
                                        <th>Reports This Month</th>
                                        <th>Avg. Attendance</th>
                                        <th>Student Rating</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monitoringData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.lecturer_name}</td>
                                            <td>{item.course_name}</td>
                                            <td>{item.last_report}</td>
                                            <td>{item.reports_count}</td>
                                            <td>{item.attendance_rate}%</td>
                                            <td>{item.rating}/5</td>
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

                <div className="monitoring-notes">
                    <h3>Monitoring Responsibilities</h3>
                    <p>As Principal Lecturer, your monitoring duties include:</p>
                    <ul>
                        <li>Tracking teaching activity and report submission</li>
                        <li>Monitoring student attendance patterns</li>
                        <li>Reviewing student feedback and ratings</li>
                        <li>Identifying areas for improvement</li>
                        <li>Ensuring academic standards are maintained</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Monitoring;
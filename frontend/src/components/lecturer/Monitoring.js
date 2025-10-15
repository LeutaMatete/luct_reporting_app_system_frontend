import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Monitoring() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        // Simulate loading monitoring data
        setTimeout(() => {
            setAttendanceData([]); // Empty since no reports yet
            setLoading(false);
        }, 1000);
    }, []);

    const calculateAttendanceRate = (present, total) => {
        if (total === 0) return 0;
        return ((present / total) * 100).toFixed(1);
    };

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            <div className="dashboard-content">
                <div className="loading">Loading monitoring data...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole={user.role} />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Class Monitoring</h1>
                    <p>Track student attendance and class performance</p>
                </div>

                <div className="monitoring-stats">
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Total Classes Conducted</h3>
                            <p className="stat-number">{attendanceData.length}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Average Attendance Rate</h3>
                            <p className="stat-number">
                                {attendanceData.length > 0 
                                    ? calculateAttendanceRate(
                                        attendanceData.reduce((sum, item) => sum + item.present, 0),
                                        attendanceData.reduce((sum, item) => sum + item.total, 0)
                                    ) + '%'
                                    : '0%'
                                }
                            </p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-info">
                            <h3>Reports Submitted</h3>
                            <p className="stat-number">{attendanceData.length}</p>
                        </div>
                    </div>
                </div>

                <div className="attendance-section">
                    <div className="section-header">
                        <h2>Attendance Records</h2>
                    </div>

                    {attendanceData.length === 0 ? (
                        <div className="no-data">
                            <p>No attendance records found.</p>
                            <p>Submit your first class report to start tracking attendance.</p>
                        </div>
                    ) : (
                        <div className="attendance-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Class</th>
                                        <th>Course</th>
                                        <th>Present</th>
                                        <th>Total</th>
                                        <th>Attendance Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData.map((record, index) => (
                                        <tr key={index}>
                                            <td>{record.date}</td>
                                            <td>{record.class_name}</td>
                                            <td>{record.course_name}</td>
                                            <td>{record.present}</td>
                                            <td>{record.total}</td>
                                            <td>{calculateAttendanceRate(record.present, record.total)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="monitoring-notes">
                    <h3>Monitoring Notes</h3>
                    <ul>
                        <li>Attendance data is automatically collected from submitted class reports</li>
                        <li>Submit reports regularly to maintain accurate monitoring data</li>
                        <li>Contact administration for any discrepancies in attendance records</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Monitoring;
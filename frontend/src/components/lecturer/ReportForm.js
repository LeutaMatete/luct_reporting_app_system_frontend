import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportForm.css';

function ReportForm() {
    const [formData, setFormData] = useState({
        facultyName: '',
        className: '',
        weekOfReporting: '',
        dateOfLecture: '',
        courseName: '',
        courseCode: '',
        lecturerName: '',
        actualStudentsPresent: '',
        totalRegisteredStudents: '',
        venue: '',
        scheduledLectureTime: '',
        topicTaught: '',
        learningOutcomes: '',
        lecturerRecommendations: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        // Set lecturer name from user data
        if (user.firstName && user.lastName) {
            setFormData(prev => ({
                ...prev,
                lecturerName: `${user.firstName} ${user.lastName}`,
                facultyName: user.facultyName || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/reports', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    lecturer_id: user.id
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess('Report submitted successfully!');
                setFormData({
                    facultyName: user.facultyName || '',
                    className: '',
                    weekOfReporting: '',
                    dateOfLecture: '',
                    courseName: '',
                    courseCode: '',
                    lecturerName: `${user.firstName} ${user.lastName}`,
                    actualStudentsPresent: '',
                    totalRegisteredStudents: '',
                    venue: '',
                    scheduledLectureTime: '',
                    topicTaught: '',
                    learningOutcomes: '',
                    lecturerRecommendations: ''
                });
                setTimeout(() => {
                    navigate('/lecturer/reports');
                }, 2000);
            } else {
                setError(data.message || 'Failed to submit report');
            }
        } catch (error) {
            console.error('Report submission error:', error);
            setError('Failed to submit report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="report-form-container">
            <div className="report-form-header">
                <h1>Lecturer Reporting Form</h1>
                <p>Submit your lecture report</p>
            </div>

            <form onSubmit={handleSubmit} className="report-form">
                <div className="form-section">
                    <h2>Basic Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="facultyName">Faculty Name *</label>
                            <input
                                type="text"
                                id="facultyName"
                                name="facultyName"
                                value={formData.facultyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="className">Class Name *</label>
                            <input
                                type="text"
                                id="className"
                                name="className"
                                value={formData.className}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="weekOfReporting">Week of Reporting *</label>
                            <input
                                type="text"
                                id="weekOfReporting"
                                name="weekOfReporting"
                                value={formData.weekOfReporting}
                                onChange={handleChange}
                                placeholder="e.g., Week 6"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateOfLecture">Date of Lecture *</label>
                            <input
                                type="date"
                                id="dateOfLecture"
                                name="dateOfLecture"
                                value={formData.dateOfLecture}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Course Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="courseName">Course Name *</label>
                            <input
                                type="text"
                                id="courseName"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="courseCode">Course Code *</label>
                            <input
                                type="text"
                                id="courseCode"
                                name="courseCode"
                                value={formData.courseCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lecturerName">Lecturer's Name *</label>
                        <input
                            type="text"
                            id="lecturerName"
                            name="lecturerName"
                            value={formData.lecturerName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Attendance Information</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="actualStudentsPresent">Actual Number of Students Present *</label>
                            <input
                                type="number"
                                id="actualStudentsPresent"
                                name="actualStudentsPresent"
                                value={formData.actualStudentsPresent}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="totalRegisteredStudents">Total Number of Registered Students *</label>
                            <input
                                type="number"
                                id="totalRegisteredStudents"
                                name="totalRegisteredStudents"
                                value={formData.totalRegisteredStudents}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Class Details</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="venue">Venue of the Class *</label>
                            <input
                                type="text"
                                id="venue"
                                name="venue"
                                value={formData.venue}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="scheduledLectureTime">Scheduled Lecture Time *</label>
                            <input
                                type="time"
                                id="scheduledLectureTime"
                                name="scheduledLectureTime"
                                value={formData.scheduledLectureTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Teaching Details</h2>
                    <div className="form-group">
                        <label htmlFor="topicTaught">Topic Taught *</label>
                        <textarea
                            id="topicTaught"
                            name="topicTaught"
                            value={formData.topicTaught}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="learningOutcomes">Learning Outcomes of the Topic *</label>
                        <textarea
                            id="learningOutcomes"
                            name="learningOutcomes"
                            value={formData.learningOutcomes}
                            onChange={handleChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lecturerRecommendations">Lecturer's Recommendations</label>
                        <textarea
                            id="lecturerRecommendations"
                            name="lecturerRecommendations"
                            value={formData.lecturerRecommendations}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Report'}
                    </button>
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate('/lecturer/dashboard')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ReportForm;
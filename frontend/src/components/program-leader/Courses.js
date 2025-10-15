import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Courses() {
    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showAssignModule, setShowAssignModule] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newCourse, setNewCourse] = useState({
        courseCode: '',
        courseName: '',
        facultyName: ''
    });
    const [assignment, setAssignment] = useState({
        courseId: '',
        lecturerId: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Simulate loading data
        setTimeout(() => {
            setCourses([]);
            setLecturers([]);
            setLoading(false);
        }, 1000);
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        if (!newCourse.courseCode || !newCourse.courseName) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCourse)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Course added successfully!');
                setNewCourse({ courseCode: '', courseName: '', facultyName: '' });
                setShowAddCourse(false);
                fetchData(); // Refresh the list
            } else {
                alert(data.message || 'Failed to add course');
            }
        } catch (error) {
            console.error('Add course error:', error);
            alert('Failed to add course. Please try again.');
        }
    };

    const handleAssignModule = async (e) => {
        e.preventDefault();
        if (!assignment.courseId || !assignment.lecturerId) {
            alert('Please select both course and lecturer');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/courses/assign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(assignment)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Module assigned successfully!');
                setAssignment({ courseId: '', lecturerId: '' });
                setShowAssignModule(false);
                fetchData(); // Refresh the list
            } else {
                alert(data.message || 'Failed to assign module');
            }
        } catch (error) {
            console.error('Assign module error:', error);
            alert('Failed to assign module. Please try again.');
        }
    };

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="loading">Loading courses...</div>
            </div>
        </div>
    );

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Course Management</h1>
                    <p>Add courses and assign lecture modules to lecturers</p>
                </div>

                <div className="action-buttons">
                    <button 
                        className="action-btn primary"
                        onClick={() => setShowAddCourse(true)}
                    >
                        Add New Course
                    </button>
                    <button 
                        className="action-btn secondary"
                        onClick={() => setShowAssignModule(true)}
                    >
                        Assign Module to Lecturer
                    </button>
                </div>

                <div className="courses-section">
                    <div className="section-header">
                        <h2>All Courses</h2>
                    </div>

                    {courses.length === 0 ? (
                        <div className="no-data">
                            <p>No courses available yet.</p>
                            <p>Add your first course to get started.</p>
                        </div>
                    ) : (
                        <div className="courses-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Course Code</th>
                                        <th>Course Name</th>
                                        <th>Faculty</th>
                                        <th>Assigned Lecturer</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course.id}>
                                            <td>{course.course_code}</td>
                                            <td>{course.course_name}</td>
                                            <td>{course.faculty_name}</td>
                                            <td>{course.lecturer_name || 'Not assigned'}</td>
                                            <td>
                                                <span className={`status ${course.status}`}>
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-btn primary">Edit</button>
                                                <button className="action-btn secondary">Reassign</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Add Course Modal */}
                {showAddCourse && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Add New Course</h3>
                            <form onSubmit={handleAddCourse}>
                                <div className="form-group">
                                    <label htmlFor="courseCode">Course Code *</label>
                                    <input
                                        type="text"
                                        id="courseCode"
                                        value={newCourse.courseCode}
                                        onChange={(e) => setNewCourse({...newCourse, courseCode: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="courseName">Course Name *</label>
                                    <input
                                        type="text"
                                        id="courseName"
                                        value={newCourse.courseName}
                                        onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="facultyName">Faculty Name</label>
                                    <input
                                        type="text"
                                        id="facultyName"
                                        value={newCourse.facultyName}
                                        onChange={(e) => setNewCourse({...newCourse, facultyName: e.target.value})}
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="action-btn primary">
                                        Add Course
                                    </button>
                                    <button 
                                        type="button" 
                                        className="action-btn secondary"
                                        onClick={() => setShowAddCourse(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Assign Module Modal */}
                {showAssignModule && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Assign Module to Lecturer</h3>
                            <form onSubmit={handleAssignModule}>
                                <div className="form-group">
                                    <label htmlFor="courseSelect">Select Course *</label>
                                    <select
                                        id="courseSelect"
                                        value={assignment.courseId}
                                        onChange={(e) => setAssignment({...assignment, courseId: e.target.value})}
                                        required
                                    >
                                        <option value="">Choose a course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>
                                                {course.course_code} - {course.course_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lecturerSelect">Select Lecturer *</label>
                                    <select
                                        id="lecturerSelect"
                                        value={assignment.lecturerId}
                                        onChange={(e) => setAssignment({...assignment, lecturerId: e.target.value})}
                                        required
                                    >
                                        <option value="">Choose a lecturer</option>
                                        {lecturers.map(lecturer => (
                                            <option key={lecturer.id} value={lecturer.id}>
                                                {lecturer.first_name} {lecturer.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="action-btn primary">
                                        Assign Module
                                    </button>
                                    <button 
                                        type="button" 
                                        className="action-btn secondary"
                                        onClick={() => setShowAssignModule(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Courses;
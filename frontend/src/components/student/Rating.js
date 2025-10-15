import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Rating() {
    const [lecturerToRate, setLecturerToRate] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const pendingRating = localStorage.getItem('pendingRating');
        if (pendingRating) {
            setLecturerToRate(JSON.parse(pendingRating));
        } else {
            navigate('/student/monitoring');
        }
    }, [navigate]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const submitRating = async () => {
        if (rating === 0) {
            alert('Please select a rating before submitting.');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            const response = await fetch('http://localhost:5000/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    report_id: lecturerToRate.reportId,
                    lecturer_id: lecturerToRate.lecturerId,
                    lecturer_name: lecturerToRate.lecturerName,
                    course_name: lecturerToRate.courseName,
                    rating: rating,
                    comment: comment,
                    student_id: user.id
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitted(true);
                localStorage.removeItem('pendingRating');
                
                // Refresh all dashboards by triggering data updates
                setTimeout(() => {
                    navigate('/student/monitoring');
                }, 2000);
            } else {
                alert(data.message || 'Failed to submit rating');
            }
        } catch (error) {
            console.error('Submit rating error:', error);
            alert('Failed to submit rating. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const goBackToMonitoring = () => {
        localStorage.removeItem('pendingRating');
        navigate('/student/monitoring');
    };

    if (!lecturerToRate) {
        return (
            <div className="dashboard">
                <Header />
                <Navigation userRole="student" />
                <div className="dashboard-content">
                    <div className="loading">Loading...</div>
                </div>
            </div>
        );
    }

    if (submitted) {
        return (
            <div className="dashboard">
                <Header />
                <Navigation userRole="student" />
                <div className="dashboard-content">
                    <div className="success-message">
                        <h2>Thank You!</h2>
                        <p>Your rating has been submitted successfully.</p>
                        <p>The lecturer will see your feedback in their dashboard.</p>
                        <button 
                            onClick={goBackToMonitoring}
                            className="action-btn primary"
                        >
                            Back to Monitoring
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="student" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Rate Lecturer</h1>
                    <p>Provide feedback for {lecturerToRate.lecturerName}</p>
                </div>

                <div className="rating-instructions">
                    <h3>Rating Guidelines</h3>
                    <ul>
                        <li>Rate the lecturer based on their teaching and this class report</li>
                        <li>1 star = Poor, 5 stars = Excellent</li>
                        <li>Provide constructive comments to help the lecturer improve</li>
                        <li>Your rating is anonymous and confidential</li>
                    </ul>
                </div>

                <div className="lecturer-rating-card">
                    <div className="lecturer-info">
                        <h3>{lecturerToRate.lecturerName}</h3>
                        <p><strong>Course:</strong> {lecturerToRate.courseName}</p>
                        <p>You are rating based on their submitted class report</p>
                    </div>
                    
                    <div className="rating-section">
                        <label>Your Rating:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map(star => (
                                <button
                                    key={star}
                                    type="button"
                                    className={`star-btn ${rating >= star ? 'active' : ''}`}
                                    onClick={() => handleRatingChange(star)}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <div className="rating-labels">
                            <span>Poor</span>
                            <span>Excellent</span>
                        </div>
                        {rating > 0 && (
                            <div className="selected-rating">
                                You selected: {rating} star{rating !== 1 ? 's' : ''}
                            </div>
                        )}
                    </div>

                    <div className="comment-section">
                        <label>Comments (Optional):</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Provide constructive feedback about the lecturer's teaching..."
                            rows="4"
                        />
                    </div>

                    <div className="submit-section">
                        <button 
                            onClick={submitRating}
                            className="submit-btn primary"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit Rating'}
                        </button>
                        <button 
                            onClick={goBackToMonitoring}
                            className="action-btn secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rating;
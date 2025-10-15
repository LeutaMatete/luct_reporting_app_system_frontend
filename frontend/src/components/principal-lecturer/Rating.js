import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Rating() {
    const [ratings, setRatings] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPRLRatings();
        fetchRatingStatistics();
    }, []);

    const fetchPRLRatings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/ratings/prl', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setRatings(data.ratings);
            } else {
                setError(data.message || 'Failed to fetch stream ratings');
            }
        } catch (error) {
            console.error('Fetch PRL ratings error:', error);
            setError('Failed to fetch stream ratings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchRatingStatistics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/ratings/statistics', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setStatistics(data.statistics);
            }
        } catch (error) {
            console.error('Fetch rating statistics error:', error);
        }
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        ratings.forEach(rating => {
            distribution[rating.rating_value]++;
        });
        return distribution;
    };

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            <div className="dashboard-content">
                <div className="loading">Loading stream ratings...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            <div className="dashboard-content">
                <div className="error-message">{error}</div>
            </div>
        </div>
    );

    const distribution = getRatingDistribution();
    const streamRating = statistics.average_rating ? parseFloat(statistics.average_rating).toFixed(1) : 0;

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="principal_lecturer" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Stream Performance Ratings</h1>
                    <p>View student ratings for lecturers in your stream</p>
                </div>

                <div className="rating-overview">
                    <div className="overview-card">
                        <h3>Stream Average Rating</h3>
                        <div className="rating-score">{streamRating}</div>
                        <div className="rating-scale">out of 5</div>
                        <div className="total-ratings">
                            Based on {statistics.total_ratings || 0} student ratings
                        </div>
                        <div className="lecturers-count">
                            {statistics.lecturers_rated || 0} lecturers rated
                        </div>
                    </div>
                    
                    <div className="rating-breakdown">
                        <h3>Rating Distribution</h3>
                        {[5, 4, 3, 2, 1].map(stars => {
                            const count = distribution[stars];
                            const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
                            return (
                                <div key={stars} className="rating-bar">
                                    <span className="stars">{stars} stars</span>
                                    <div className="bar-container">
                                        <div 
                                            className="bar-fill" 
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="count">({count})</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="feedback-section">
                    <div className="section-header">
                        <h2>Recent Student Feedback</h2>
                    </div>

                    {ratings.length === 0 ? (
                        <div className="no-data">
                            <p>No ratings available for lecturers in your stream yet.</p>
                            <p>Ratings will appear here once students start providing feedback.</p>
                        </div>
                    ) : (
                        <div className="feedback-list">
                            {ratings.slice(0, 10).map((rating, index) => (
                                <div key={index} className="feedback-card">
                                    <div className="feedback-header">
                                        <div className="rating-stars">
                                            {'★'.repeat(rating.rating_value)}{'☆'.repeat(5 - rating.rating_value)}
                                        </div>
                                        <div className="feedback-date">
                                            {new Date(rating.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="feedback-course">
                                        <strong>{rating.course_name}</strong> - {rating.lecturer_name}
                                    </div>
                                    <div className="feedback-class">
                                        Class: {rating.class_name}
                                    </div>
                                    {rating.feedback_text && (
                                        <div className="feedback-comment">
                                            "{rating.feedback_text}"
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="stream-insights">
                    <h3>Stream Insights</h3>
                    <div className="insights-grid">
                        <div className="insight-card">
                            <h4>Total Feedback</h4>
                            <p>{statistics.total_ratings || 0} ratings</p>
                        </div>
                        <div className="insight-card">
                            <h4>Lecturers Rated</h4>
                            <p>{statistics.lecturers_rated || 0} staff</p>
                        </div>
                        <div className="insight-card">
                            <h4>Average Rating</h4>
                            <p>{streamRating}/5</p>
                        </div>
                        <div className="insight-card">
                            <h4>Quality Score</h4>
                            <p>{((streamRating / 5) * 100).toFixed(0)}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rating;
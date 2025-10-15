import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Rating() {
    const [ratings, setRatings] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchRatings();
        
        // Refresh data every 30 seconds to get latest ratings
        const interval = setInterval(() => {
            fetchRatings();
        }, 30000);
        
        return () => clearInterval(interval);
    }, []);

    const fetchRatings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/ratings/lecturer', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setRatings(data.ratings);
                setAverageRating(data.averageRating);
                setTotalRatings(data.totalRatings);
            } else {
                setError(data.message || 'Failed to fetch ratings');
            }
        } catch (error) {
            console.error('Fetch ratings error:', error);
            setError('Failed to fetch ratings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const refreshRatings = async () => {
        setLoading(true);
        await fetchRatings();
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
            <Navigation userRole="lecturer" />
            <div className="dashboard-content">
                <div className="loading">Loading student ratings...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="lecturer" />
            <div className="dashboard-content">
                <div className="error-message">{error}</div>
            </div>
        </div>
    );

    const distribution = getRatingDistribution();

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="lecturer" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <div className="header-actions">
                        <h1>Student Ratings and Feedback</h1>
                        <button 
                            onClick={refreshRatings}
                            className="action-btn secondary"
                            disabled={loading}
                        >
                            {loading ? 'Refreshing...' : 'Refresh Ratings'}
                        </button>
                    </div>
                    <p>Feedback from students based on your submitted reports</p>
                </div>

                <div className="rating-overview">
                    <div className="overview-card">
                        <h3>Overall Rating</h3>
                        <div className="rating-score">{averageRating}</div>
                        <div className="rating-scale">out of 5</div>
                        <div className="total-ratings">Based on {totalRatings} student ratings</div>
                    </div>
                    
                    <div className="rating-breakdown">
                        <h3>Rating Distribution</h3>
                        {[5, 4, 3, 2, 1].map(stars => {
                            const count = distribution[stars];
                            const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
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
                        <h2>Student Feedback</h2>
                        <p>Feedback received for your class reports</p>
                    </div>

                    {ratings.length === 0 ? (
                        <div className="no-data">
                            <p>No student ratings received yet.</p>
                            <p>Students will be able to rate you after you submit class reports.</p>
                        </div>
                    ) : (
                        <div className="feedback-list">
                            {ratings.map((rating, index) => (
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
                                        {rating.course_name} - {rating.class_name}
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
            </div>
        </div>
    );
}

export default Rating;
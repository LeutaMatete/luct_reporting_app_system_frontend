import React, { useState, useEffect } from 'react';
import Header from '../common/Header';
import Navigation from '../common/Navigation';
import '../common/Dashboard.css';

function Rating() {
    const [ratings, setRatings] = useState([]);
    const [programRating, setProgramRating] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProgramRatings();
    }, []);

    const fetchProgramRatings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/ratings/program', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setRatings(data.ratings);
                setProgramRating(data.overallRating);
                setTotalCourses(data.totalCourses);
            } else {
                setError(data.message || 'Failed to fetch program ratings');
            }
        } catch (error) {
            console.error('Fetch program ratings error:', error);
            setError('Failed to fetch program ratings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        ratings.forEach(rating => {
            distribution[5] += rating.five_star;
            distribution[4] += rating.four_star;
            distribution[3] += rating.three_star;
            distribution[2] += rating.two_star;
            distribution[1] += rating.one_star;
        });
        return distribution;
    };

    if (loading) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="loading">Loading program ratings...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            <div className="dashboard-content">
                <div className="error-message">{error}</div>
            </div>
        </div>
    );

    const distribution = getRatingDistribution();
    const totalRatings = Object.values(distribution).reduce((sum, count) => sum + count, 0);

    return (
        <div className="dashboard">
            <Header />
            <Navigation userRole="program_leader" />
            
            <div className="dashboard-content">
                <div className="dashboard-header">
                    <h1>Program Ratings</h1>
                    <p>View overall program ratings and performance metrics</p>
                </div>

                <div className="program-rating-overview">
                    <div className="overview-card large">
                        <h3>Overall Program Rating</h3>
                        <div className="rating-score">{programRating}</div>
                        <div className="rating-scale">out of 5</div>
                        <div className="rating-details">
                            <p>Based on {totalRatings} ratings across {totalCourses} courses</p>
                        </div>
                    </div>
                    
                    <div className="rating-breakdown">
                        <h3>Rating Distribution</h3>
                        <div className="distribution-bars">
                            {[5, 4, 3, 2, 1].map(stars => {
                                const count = distribution[stars];
                                const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                                return (
                                    <div key={stars} className="distribution-bar">
                                        <span className="stars">{stars} stars</span>
                                        <div className="bar-container">
                                            <div className="bar-fill" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                        <span className="count">({count})</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="detailed-ratings">
                    <div className="section-header">
                        <h2>Course-wise Ratings</h2>
                    </div>

                    {ratings.length === 0 ? (
                        <div className="no-data">
                            <p>No detailed ratings available yet.</p>
                            <p>Course ratings will appear here once students start providing feedback.</p>
                        </div>
                    ) : (
                        <div className="ratings-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Lecturer</th>
                                        <th>Total Ratings</th>
                                        <th>Average Rating</th>
                                        <th>5 Stars</th>
                                        <th>4 Stars</th>
                                        <th>3 Stars</th>
                                        <th>2 Stars</th>
                                        <th>1 Star</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ratings.map((rating, index) => (
                                        <tr key={index}>
                                            <td>{rating.course_name}</td>
                                            <td>{rating.lecturer_name}</td>
                                            <td>{rating.total_ratings}</td>
                                            <td>{parseFloat(rating.average_rating).toFixed(1)}</td>
                                            <td>{rating.five_star}</td>
                                            <td>{rating.four_star}</td>
                                            <td>{rating.three_star}</td>
                                            <td>{rating.two_star}</td>
                                            <td>{rating.one_star}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="rating-insights">
                    <h3>Program Quality Insights</h3>
                    <div className="insights-grid">
                        <div className="insight-card">
                            <h4>Top Performing Course</h4>
                            <p>
                                {ratings.length > 0 
                                    ? ratings[0].course_name + ` (${parseFloat(ratings[0].average_rating).toFixed(1)}/5)`
                                    : 'No data available'
                                }
                            </p>
                        </div>
                        <div className="insight-card">
                            <h4>Total Courses Rated</h4>
                            <p>{totalCourses}</p>
                        </div>
                        <div className="insight-card">
                            <h4>Overall Satisfaction</h4>
                            <p>{programRating}/5</p>
                        </div>
                        <div className="insight-card">
                            <h4>Total Feedback</h4>
                            <p>{totalRatings} ratings</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Rating;
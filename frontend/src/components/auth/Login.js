import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                console.log('Login successful, user:', data.user);
                
                // Redirect based on user role
                switch(data.user.role) {
                    case 'student':
                        navigate('/student/dashboard');
                        break;
                    case 'lecturer':
                        navigate('/lecturer/dashboard');
                        break;
                    case 'principal_lecturer':
                        navigate('/principal-lecturer/dashboard');
                        break;
                    case 'program_leader':
                        navigate('/program-leader/dashboard');
                        break;
                    default:
                        navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Cannot connect to server. Please make sure the backend is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login to Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                            {error.includes('Cannot connect') && (
                                <div style={{ marginTop: '10px', fontSize: '0.9em' }}>
                                    Make sure you've started the backend server:
                                    <code style={{ display: 'block', background: '#f5f5f5', padding: '5px', marginTop: '5px' }}>
                                        cd backend && npm run dev
                                    </code>
                                </div>
                            )}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                <p className="auth-link">
                    <Link to="/">← Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
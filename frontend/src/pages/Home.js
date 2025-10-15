import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-header">
                <h1>LUCT Reporting Application</h1>
                <p>Faculty Reporting System - Limkokwing University of Creative Technology</p>
            </div>
            
            <div className="home-content">
                <div className="app-description">
                    <h2>About the Application</h2>
                    <p>
                        This web-based reporting application is designed for the Faculty of Information 
                        Communication Technology at LUCT. It provides a comprehensive platform for 
                        lecturers to submit reports and for various stakeholders to monitor and review 
                        academic activities.
                    </p>
                </div>

                <div className="auth-buttons">
                    <h3>Get Started</h3>
                    <div className="button-group">
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
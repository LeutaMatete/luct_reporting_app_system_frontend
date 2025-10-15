import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const getRoleDisplayName = (role) => {
        const roleNames = {
            student: 'Student',
            lecturer: 'Lecturer',
            principal_lecturer: 'Principal Lecturer',
            program_leader: 'Program Leader'
        };
        return roleNames[role] || role;
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/">
                        <h2>LUCT Reporting System</h2>
                    </Link>
                </div>
                
                <div className="user-info">
                    <span className="welcome">
                        Welcome, {user.firstName} {user.lastName}
                    </span>
                    <span className="role">
                        ({getRoleDisplayName(user.role)})
                    </span>
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
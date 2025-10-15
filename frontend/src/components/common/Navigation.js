import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ userRole }) {
    const getNavigationItems = () => {
        const baseItems = {
            student: [
                { path: '/student/dashboard', label: 'Dashboard'},
                { path: '/student/monitoring', label: 'Monitoring' },
                { path: '/student/rating', label: 'Rating' }
            ],
            lecturer: [
                { path: '/lecturer/dashboard', label: 'Dashboard'},
                { path: '/lecturer/classes', label: 'Classes'},
                { path: '/lecturer/reports', label: 'Reports' },
                { path: '/lecturer/monitoring', label: 'Monitoring'},
                { path: '/lecturer/rating', label: 'Rating' }
            ],
            principal_lecturer: [
                { path: '/principal-lecturer/dashboard', label: 'Dashboard'},
                { path: '/principal-lecturer/courses', label: 'Courses'},
                { path: '/principal-lecturer/reports', label: 'Reports'},
                { path: '/principal-lecturer/monitoring', label: 'Monitoring' },
                { path: '/principal-lecturer/rating', label: 'Rating' },
                { path: '/principal-lecturer/classes', label: 'Classes'}
            ],
            program_leader: [
                { path: '/program-leader/dashboard', label: 'Dashboard'},
                { path: '/program-leader/courses', label: 'Courses'},
                { path: '/program-leader/reports', label: 'Reports'},
                { path: '/program-leader/monitoring', label: 'Monitoring'},
                { path: '/program-leader/classes', label: 'Classes' },
                { path: '/program-leader/lectures', label: 'Lectures'},
                { path: '/program-leader/rating', label: 'Rating'}
            ]
        };

        return baseItems[userRole] || [];
    };

    const navItems = getNavigationItems();

    return (
        <nav className="navigation">
            <div className="nav-content">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                            `nav-item ${isActive ? 'nav-item-active' : ''}`
                        }
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}

export default Navigation;
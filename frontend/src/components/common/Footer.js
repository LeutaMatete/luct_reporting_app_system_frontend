import React from 'react';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>LUCT Reporting System</h3>
                    <p>Faculty of Information Communication Technology</p>
                </div>
                
                <div className="footer-section">
                    <p className="footer-contact">
                        Contact: mateteleuta5@gmail.com
                    </p>
                </div>
                
                <div className="footer-section">
                    <p className="footer-copyright">
                        © {currentYear} LUCT. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
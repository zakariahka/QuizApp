import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
    return (
        <header>
            <nav>
                <Link to="/Profile">Profile</Link>
                <Link to="/HomePage">Home Page</Link>
            </nav>
        </header>
    );
}

export default Header;

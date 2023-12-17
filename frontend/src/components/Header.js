import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <Link to="/Profile">Profile</Link>
                <Link to="/QuizCreator">Create a Quiz!</Link>
            </nav>
        </header>
    );
}

export default Header;

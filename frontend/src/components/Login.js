import React from 'react';
import { Link } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
    return (
        <div className="login-container">
            <div className="title-container">
                <h1>Quiz Battle</h1>
                <p className="slogan">Your Ultimate Trivia Challenge</p> 
            </div>
            <form className="login-form">
                <input type="text" placeholder="Email or Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
                <p className="register-link">
                    No account? <Link to="/Register">Register here</Link> 
                </p>
            </form>
        </div>
    );
}

export default Login;

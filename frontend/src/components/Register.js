import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        profilePic: ''
    });
    const { register } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            setFormData({ email: '', username: '', password: '', profilePic: '' });
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="login-container">
            <div className="title-container">
                <h1>Quiz Battle</h1>
                <p className="slogan">Join the Challenge</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={formData.email} required onChange={handleChange} />
                <input type="text" name="username" placeholder="Username" value={formData.username} required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} required onChange={handleChange} />
                <input type="text" name="profilePic" placeholder="Profile Picture URL (optional)" value={formData.profilePic} onChange={handleChange} />
                <button type="submit">Register</button>
                <p className="register-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;

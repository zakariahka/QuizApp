import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import './Login.css';
import axios from 'axios';
const Login = () => {
    
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
    const [error, setError] = useState(''); 
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            "http://localhost:5000/api/users/login",
            formData
          );
          if (response.status === 200 && response.data.user) {
            setUser(response.data.user)
            if(user){
                navigate('/HomePage');
            }
          } else {
            setError('Login failed. Please check your credentials.');
          }
        } catch (error) {
          setError(error.response ? error.response.data.message : 'Login failed. Please try again.');
        }
      };
  
    return (
      <div className="login-container">
        <div className="title-container">
          <h1>Quiz Battle</h1>
          <p className="slogan">Your Ultimate Trivia Challenge</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username" 
            placeholder="Email or Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password" 
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
          <p className="register-link">
            No account? <Link to="/Register">Register here</Link>
          </p>
        </form>
      </div>
    );
  };
  
  export default Login;
  
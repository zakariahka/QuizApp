import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userActions'; 
import axios from 'axios';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
    });
    const [error, setError] = useState(''); 
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

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
          dispatch(setUser(response.data.user)); // Dispatch setUser action
          navigate('/HomePage');
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
  
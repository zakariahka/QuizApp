import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    profilePic: null, // Change to null for file input
  });
  const { register } = useAuth();
  const navigate = useNavigate()

  // Define handleChange function
  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      // Handle file input
      setFormData({ ...formData, profilePic: e.target.files[0] });
    } else {
      // Handle other inputs
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("username", formData.username); // Assuming you want to send username as well
    if (formData.profilePic) {
      form.append("profilePic", formData.profilePic);
    }
  
    try {
      // Call the register function with the FormData object
      await register(form);
      // Reset form state if needed
      setFormData({ email: "", username: "", password: "", profilePic: null });
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="title-container">
        <h1>Quiz Battle</h1>
        <p className="slogan">Join the Challenge</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          required
          onChange={handleChange}
        />
        <input
          type="file"
          name="profilePic"
          onChange={handleChange}
          accept="image/*"
        />
        <button type="submit">Register</button>
        <p className="register-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

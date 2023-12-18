import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
      } else {
        console.error(response.data.message); 
      }
    } catch (error) {
      console.error("Login error", error.response ? error.response.data : error.message);
    }
  }

  const logout = () => {
    setUser(null);
  };

  const register = async (formData) => {
    try {
      // Make a POST request to the register endpoint
      const response = await axios.post(
        'http://localhost:5000/api/users/register', // Update the URL to match your backend route
        formData, // FormData object containing the registration data
        {
          headers: {
            // You can set headers here if needed
          },
        }
      );
  
      // Check the response data for the token and user details
      if (response.data && response.data.token) {
        // Registration successful, you can save the token to your app's state
        const token = response.data.token;
        // You may also want to save user details to your app's state
        const user = response.data.user;
  
        console.log('Registration successful');
        return { token, user };
      } else {
        // Handle registration failure
        console.error('Registration failed');
        return null;
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Registration error', error);
      return null;
    }
  };

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/userinfo/${userId}`);
      if (response.status === 200 && response.data.user) {
        console.log("User info:", response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.error("Error fetching user information", error.response ? error.response.data : error.message);
    }
  };

  const addQuizScore = async (userId, quizId, score) => {
    try {
      await axios.post("http://localhost:5000/api/users/addQuizScore", {
        userId,
        quizId,
        score
      });
      console.log("Quiz score added successfully");
    } catch (error) {
      console.error("Error adding quiz score", error.response ? error.response.data : error.message);
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    setUser,
    getUserInfo,
    addQuizScore
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

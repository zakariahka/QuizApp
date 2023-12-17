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
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      if (response.data && response.data.newUser) {
        setUser(response.data.newUser);
        console.log("Registration successful");
      }
    } catch (error) {
      console.error("Registration error", error);
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

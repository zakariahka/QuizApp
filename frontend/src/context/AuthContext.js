import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);

      if (response.data && response.data.newUser) {
        setUser(response.data.newUser);
        console.log("YESSS")
      }
  
    } catch (error) {
      console.error('Registration error', error);
    }
  };
  
  const value = {
    user,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

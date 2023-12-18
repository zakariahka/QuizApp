import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import QuizCreator from "./components/QuizCreator";
import Profile from "./components/Profile";
import QuizPage from './components/QuizPage';
import JoinQuiz from "./components/JoinQuiz";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/QuizCreator" element={<QuizCreator />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/quiz/:gameCode" element={<QuizPage />} />
          <Route path="/JoinQuiz" element={<JoinQuiz />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

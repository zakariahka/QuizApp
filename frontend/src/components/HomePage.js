import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Create a CSS file for your homepage styles

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="title-container">
        <h1>Quiz Battle</h1>
        <Link to="/Profile">Profile</Link>
        <p className="slogan">Your Ultimate Trivia Challenge</p>
      </div>
      <div className="button-container">
        <Link to="/QuizCreator" className="action-button create-button">
          Create a Quiz
        </Link>
        <Link to="/join-quiz" className="action-button join-button">
          Join a Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

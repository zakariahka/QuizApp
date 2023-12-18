import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserStatus } from '../redux/actions'; // Adjust the path as necessary
import "./HomePage.css";
import Header from "./Header";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateToQuizCreator = () => {
    dispatch(setUserStatus('creating'));
    navigate("/QuizCreator");
  };

  const navigateToJoinQuiz = () => {
    dispatch(setUserStatus('joining'));
    navigate("/JoinQuiz");
  };
  return (
    <div>
      <Header />
      <div className="home-container">
        <div className="title-container">
          <h1>Quiz Battle</h1>
          <p className="slogan">Your Ultimate Trivia Challenge</p>
        </div>
        <div className="button-container">
          <button
            onClick={navigateToQuizCreator}
            className="action-button create-button"
          >
            Create a Quiz
          </button>
          <button
            onClick={navigateToJoinQuiz}
            className="action-button join-button"
          >
            Join a Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

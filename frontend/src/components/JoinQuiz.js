import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinQuiz.css"; // Import the CSS file for styling
import Header from "./Header.js";

const JoinQuiz = () => {
  const [quizCode, setQuizCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // perform validation or API request to check if the code is valid
    const isValidCode = true;

    if (isValidCode) {
      // redirect the user to the quiz page with the quiz code
      navigate(`/quiz/${quizCode}`);
    } else {
      setErrorMessage("Invalid quiz code. Please try again.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000); //show error message for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div>
      <Header />
      <div className="join-quiz-container">
        <h2>Join Quiz</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Quiz Code:
            <input
              type="text"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="join-button">
            Join Quiz
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default JoinQuiz;

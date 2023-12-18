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

    // Perform validation or API request to check if the code is valid
    // For this example, we'll assume the code is valid
    const isValidCode = true;

    if (isValidCode) {
      // Redirect the user to the quiz page with the quiz code
      navigate(`/quiz/${quizCode}`);
    } else {
      // Set an error message
      setErrorMessage("Invalid quiz code. Please try again.");
    }
  };

  useEffect(() => {
    // Clear the error message after a certain delay (e.g., 3 seconds)
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000); // 3 seconds delay

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

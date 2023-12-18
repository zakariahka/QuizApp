import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./QuizPage.css";

const QuizPage = () => {
  const { gameCode } = useParams();
  const location = useLocation();
  const { quizQuestions } = location.state;
  const [score, setScore] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [lastAnswerWasCorrect, setLastAnswerWasCorrect] = useState(null);
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState("");
  const { user, addQuizScore } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizStarted || currentQuestionIndex >= quizQuestions.length) {
      if (currentQuestionIndex === quizQuestions.length && !quizEnded) {
        setQuizEnded(true);
        setShowLeaderboard(true);
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          setShowLeaderboard(true);
          clearInterval(timerId);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [
    timer,
    currentQuestionIndex,
    quizQuestions.length,
    quizStarted,
    quizEnded,
  ]);

  useEffect(() => {
    if (showLeaderboard) {
      const leaderboardTimer = setTimeout(() => {
        setShowLeaderboard(false);
        if (currentQuestionIndex < quizQuestions.length) {
          setTimer(10);
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
      }, 3000);

      return () => clearTimeout(leaderboardTimer);
    }
  }, [showLeaderboard, currentQuestionIndex, quizQuestions.length]);

  useEffect(() => {
    if (showLeaderboard) {
      const leaderboardTimer = setTimeout(() => {
        setShowLeaderboard(false);
        if (currentQuestionIndex < quizQuestions.length) {
          setTimer(10);
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setLastAnswerWasCorrect(null);
          setCurrentAnswer(null);
        }
      }, 3000);

      return () => clearTimeout(leaderboardTimer);
    }
  }, [showLeaderboard, currentQuestionIndex, quizQuestions.length]);

  const handleAnswerClick = (answer, index) => {
    if (quizStarted && !showLeaderboard) {
      const correctAnswer = quizQuestions[currentQuestionIndex].correct_answer;
      const isCorrect = answer === correctAnswer;
      setCurrentAnswer(answer);
      setLastAnswerWasCorrect(isCorrect);
      setLastCorrectAnswer(correctAnswer);  
      if (answer === quizQuestions[currentQuestionIndex].correct_answer) {
        setScore(prevScore => {
          if (currentAnswer === quizQuestions[currentQuestionIndex].correct_answer) {
            return prevScore;
          }
          return prevScore + timer; 
        });
      } else {
        setScore(prevScore => {
          if (currentAnswer === quizQuestions[currentQuestionIndex].correct_answer) {
            return prevScore - timer; 
          }
          return prevScore;
        });
      }
    }
  
    // Add a line to update the class of the clicked list item
    document.querySelectorAll('.quiz-page-container ul li')
      .forEach((li, idx) => li.classList.toggle('selected', idx === index));
  };
  

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowLeaderboard(false);
    setTimer(10);
  };

  const handleQuizCompletion = async () => {
    console.log("yo");
    console.log(user);
    if (user) {
      console.log("no");
      try {
        console.log("bruh");
        await addQuizScore(user._id, gameCode, score); 
        console.log("Score added successfully");
      } catch (error) {
        console.error("Error adding score", error);
      }
    }
    navigate("/HomePage"); 
  };

  return (
    <div className="quiz-page-container">
      {!quizStarted ? (
        <div>
          <h2>Quiz Game Code: {gameCode}</h2>
          <button onClick={handleStartQuiz}>Begin</button>
        </div>
      ) : quizEnded ? (
        <div>
          <h3>Quiz Completed</h3>
          <p>Your Final Score: {score}</p>
          <button onClick={handleQuizCompletion}>Go to Home</button>
        </div>
      ) : showLeaderboard ? (
        <div>
          <h3>Leaderboard</h3>
          <p>Your Score: {score}</p>
          {lastAnswerWasCorrect !== null && (
            <p>
              You were{" "}
              <strong>{lastAnswerWasCorrect ? "correct" : "incorrect"}</strong>!
              {lastAnswerWasCorrect === false && (
                <span> The correct answer was: {lastCorrectAnswer}.</span>
              )}
            </p>
          )}
        </div>
      ) : currentQuestionIndex < quizQuestions.length ? (
        <div>
          <h3>Question {currentQuestionIndex + 1}</h3>
          <p>{quizQuestions[currentQuestionIndex].question}</p>
          <ul>
            {[
              ...quizQuestions[currentQuestionIndex].incorrect_answers,
              quizQuestions[currentQuestionIndex].correct_answer,
            ].map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer, index)}>
                {answer}
              </li>
            ))}
          </ul>
          <p>Time left: {timer} seconds</p>
        </div>
      ) : null}
    </div>
  );
  
};
export default QuizPage;

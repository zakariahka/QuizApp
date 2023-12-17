import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  const [lastCorrectAnswer, setLastCorrectAnswer] = useState('');
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
      setTimer(prev => {
        if (prev === 1) {
          setShowLeaderboard(true); 
          clearInterval(timerId);
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timerId);
  }, [timer, currentQuestionIndex, quizQuestions.length, quizStarted]);
  
  useEffect(() => {
    if (showLeaderboard) {
      const leaderboardTimer = setTimeout(() => {
        setShowLeaderboard(false); 
        if (currentQuestionIndex < quizQuestions.length) {
          setTimer(10); 
          setCurrentQuestionIndex(prevIndex => prevIndex + 1); 
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
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setLastAnswerWasCorrect(null); 
          setCurrentAnswer(null); 
        }
      }, 3000);
  
      return () => clearTimeout(leaderboardTimer);
    }
  }, [showLeaderboard, currentQuestionIndex, quizQuestions.length]);
  
  const handleAnswerClick = (answer) => {
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
  };
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowLeaderboard(false);
    setTimer(10);
  };

  return (
    <div className="quiz-page-container">
      <h2>Quiz Game Code: {gameCode}</h2>
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Begin</button>
      ) : (
        showLeaderboard || quizEnded ? (
          <div>
            <h3>Leaderboard</h3>
            <p>Your Score: {score}</p>
            {lastAnswerWasCorrect !== null && (
              <p>
                You were <strong>{lastAnswerWasCorrect ? "correct" : "incorrect"}</strong>!
                {lastAnswerWasCorrect === false && (
                  <span> The correct answer was: {lastCorrectAnswer}.</span>
                )}
              </p>
            )}
            {quizEnded && (
              <button onClick={() => navigate('/HomePage')}>Go to Home</button>
            )}
          </div>
        ) : currentQuestionIndex < quizQuestions.length ? (
          <div>
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{quizQuestions[currentQuestionIndex].question}</p>
            <ul>
              {[...quizQuestions[currentQuestionIndex].incorrect_answers, quizQuestions[currentQuestionIndex].correct_answer]
                .map((answer, index) => (
                  <li key={index} onClick={() => handleAnswerClick(answer)}>{answer}</li>
                ))
              }
            </ul>
            <p>Time left: {timer} seconds</p>
          </div>
        ) : (
          <div>
            <h3>Quiz Completed</h3>
            <p>Your Final Score: {score}</p>
          </div>
        )
      )}
    </div>
  );
        }
  export default QuizPage;
  

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './QuizCreator.css';

const QuizCreator = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
      numQuestions: 10,
      category: '',
      difficulty: 'medium',
      type: 'multiple',
    });
    const [quizQuestions, setQuizQuestions] = useState([]); 
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('https://opentdb.com/api_category.php')
        .then(response => {
          setCategories(response.data.trivia_categories);
        })
        .catch(error => {
          console.error('Error fetching categories', error);
        });
    }, []);
  
    const generateGameCode = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const apiUrl = `https://opentdb.com/api.php?amount=${formData.numQuestions}&category=${formData.category}&difficulty=${formData.difficulty}&type=${formData.type}`;
      
      axios.get(apiUrl)
      .then((response) => {
        const modifiedQuestions = response.data.results.map(question => {
          const answers = [...question.incorrect_answers, question.correct_answer];
          return { ...question, shuffledAnswers: answers };
        });
    
        const gameCode = generateGameCode();
        navigate(`/quiz/${gameCode}`, { state: { quizQuestions: modifiedQuestions } });
      })
      .catch((error) => {
        console.error('Error fetching quiz questions', error);
      });
    };


  return (
    <div className="quiz-creator-container">

      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Questions:
          <input
            type="number"
            name="numQuestions"
            value={formData.numQuestions}
            onChange={handleChange}
            min={1}
            max={50}
          />
        </label>
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Any Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Difficulty:
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Type:
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </label>
        <button type="submit">Create Quiz</button>
      </form>
    
    </div>
  );
};

export default QuizCreator;

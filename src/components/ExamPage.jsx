import React, { useState, useEffect } from 'react';
import { useExamSetup } from '../context/ExamSetupContext.js';
import { useNavigate } from 'react-router-dom';

function ExamPage() {
  const { examSetup } = useExamSetup();
  const { questions, timing } = examSetup;
  const [timeLeft, setTimeLeft] = useState(timing * 60);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !submitted) {
        // Show alert to notify the user that the test has been terminated
        window.alert('Your test has been terminated because you switched tabs.');
        // Submit the test
        handleSubmit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [submitted]);

  const handleSelect = (qIndex, option) => {
    if (!submitted) {
      setAnswers(prevAnswers => ({ ...prevAnswers, [qIndex]: option }));
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
    setTimeLeft(0);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className='Main-Container'>
      <h1>{examSetup.topic} Exam</h1>
      <div className="timer">Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</div>
      {questions.map((question, index) => (
        <div className="question" key={index}>
          <h2>{question.question}</h2>
          {question.options.map((option, oIndex) => (
            <div
              key={oIndex}
              className={`option 
                ${submitted && option === question.correctAnswer ? 'correct' : ''} 
                ${submitted && option === answers[index] && option !== question.correctAnswer ? 'incorrect' : ''}
                ${answers[index] === option ? 'selected' : ''}`}
              onClick={() => handleSelect(index, option)}
            >
              {option}
            </div>
          ))}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit}>Submit Test</button>
      )}
      {submitted && (
        <div className="result">Your score is: {score}/{questions.length}<br/>
        <button onClick={handleGoBack}>Return to Home Page</button>
        </div>
      )}
    </div>
  );
}

export default ExamPage;

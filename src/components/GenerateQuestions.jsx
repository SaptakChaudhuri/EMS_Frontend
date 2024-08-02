// GenerateQuestions.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useExamSetup } from '../context/ExamSetupContext.js';

function GenerateQuestions() {
  const { examSetup, setExamSetup } = useExamSetup();
  const { topic, numQuestions } = examSetup;
  const [questions, setQuestions] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post('https://ems-backend-3w0c.onrender.com/generate-questions', { topic, numQuestions });
        setQuestions(response.data.questions);
        setExamSetup(prevSetup => ({ ...prevSetup, questions: response.data.questions }));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [topic, numQuestions, setExamSetup]);

  if (!questions) {
    return (
      <div className="loading">
        <h2>Loading questions...</h2>
      </div>
    );
  }

  return (
    <div className='Main-Container'>
      <h1>Questions Generated</h1>
      <div>
        <h2>Generated Questions:</h2>
        <ol type="1">
          {questions.map((question, index) => (
            <li key={index}>
              <p>{question.question}</p>
              <ol type="A">
                {question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
      <div className='add'>
      <button onClick={() => navigate('/add-students')}>Add Students for the Test</button></div>
    </div>
  );
}

export default GenerateQuestions;

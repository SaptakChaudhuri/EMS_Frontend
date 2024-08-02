// ExamSetup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExamSetup } from '../context/ExamSetupContext.js';

function ExamSetup() {
  const { setExamSetup } = useExamSetup();
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [timing, setTiming] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setExamSetup({ topic, numQuestions, timing, questions: [] });
    navigate('/generate-questions');
  };

  return (
    <div className='Main-Container'>
      <h1>Generate Exam</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <label>Topic:</label>
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
          <label>Number of Questions:</label>
          <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} required />
          <label>Timing (in minutes):</label>
          <input type="text" value={timing} onChange={(e) => setTiming(e.target.value)} required />
        </div>
        <button type="submit">Generate Questions</button>
      </form>
    </div>
  );
}

export default ExamSetup;

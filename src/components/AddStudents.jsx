import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useExamSetup } from '../context/ExamSetupContext.js'; 

function AddStudents() {
  const { examSetup } = useExamSetup(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of students when the component mounts
  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://ems-backend-3w0c.onrender.com/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ems-backend-3w0c.onrender.com/add-students', {
        topic: examSetup.topic, 
        email,
        password
      });
      
      if (response.status === 201) {
        setMessage('Student added successfully');
        // Clear input fields
        setEmail('');
        setPassword('');
        // Refresh student list
        fetchStudents();
      }
    } catch (error) {
      setMessage('Error adding student');
      console.error('Error adding student:', error);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className='Main-Container'>
      <h1>Please Add Students Eligible to take Exam</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Topic: {examSetup.topic}</label><br/> 
          <label>Email of the Student:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleGoBack}>Return to Home Page</button>
      {message && <p>{message}</p>}
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <div>Topic: {student.topic}</div>
            <div>Email: {student.email}</div>
            <div>Password: {student.password}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddStudents;

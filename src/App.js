import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import ExamSetup from './components/ExamSetup.jsx';
import GenerateQuestions from './components/GenerateQuestions.jsx';
import AddStudents from './components/AddStudents.jsx';
import StudentsLogin from './components/StudentsLogin.jsx';
import ExamPage from './components/ExamPage.jsx';
import { ExamSetupProvider } from './context/ExamSetupContext';
import './App.css';

function App() {
  return (
    <Router>
      <ExamSetupProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/exam-setup" element={<ExamSetup />} />
          <Route path="/generate-questions" element={<GenerateQuestions />} />
          <Route path="/add-students" element={<AddStudents />} />
          <Route path="/students-login" element={<StudentsLogin />} />
          <Route path="/exam-page" element={<ExamPage />} />
        </Routes>
      </ExamSetupProvider>
    </Router>
  );
}

export default App;

import React, { createContext, useContext, useState } from 'react';

const ExamSetupContext = createContext();

export const ExamSetupProvider = ({ children }) => {
  const [examSetup, setExamSetup] = useState({
    topic: '',
    numQuestions: '',
    timing: '',
    questions: []
  });

  return (
    <ExamSetupContext.Provider value={{ examSetup, setExamSetup }}>
      {children}
    </ExamSetupContext.Provider>
  );
};

export const useExamSetup = () => useContext(ExamSetupContext);

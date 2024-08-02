import React from 'react';
import { useNavigate} from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); 

    const handleAdmin = (e) => {
        e.preventDefault();
        navigate('/admin-login');
    };

    const handleStudent = (e) => {
        e.preventDefault();
        navigate('/students-login');
    };

    return (
        <div className = "Main-Container">
            <h1>Welcome to the Home Page of the Exam Management System</h1>
            <button onClick = {handleAdmin}>Admin Login</button>
            <button onClick = {handleStudent}>Student Login</button>
        </div>
    )
}

export default HomePage;

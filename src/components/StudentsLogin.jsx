import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentsLogin = () => {
    const [topic,setTopic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://ems-backend-3w0c.onrender.com/students-login', {topic, email, password})
            if (response.status === 200){
                navigate('/exam-page');
            }
        } catch (err){
            setMessage(err.response.data);
        }
    };

    return (
        <div className='Student-login'>
            <h1>Welcome to Student Login Page!!</h1>
            <h3>Please Enter Your Credentials</h3>
            <form onSubmit = {handleSubmit}>
            <div>
                <label>Topic:</label>
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default StudentsLogin;
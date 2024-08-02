import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://ems-backend-3w0c.onrender.com/admin-login', {username, password})
            if (response.status === 200){
                navigate('/exam-setup');
            }
        } catch (err){
            setMessage(err.response.data);
        }
    };

    return (
        <div className='Admin-login'>
            <h1>Welcome to Admin Login Page!!</h1>
            <h3>Please Enter Your Credentials</h3>
            <form onSubmit = {handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default AdminLogin;
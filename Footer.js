import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const RegisterLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('https://dpvdxj.csb.app/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (data.message) {
      // Redirect to login page after successful registration
      navigate('/login');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('https://dpvdxj.csb.app/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    setMessage(data.message || data.error);
    if (data.message) {
      // Redirect to home page after successful login
      navigate('/home');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Register / Login</h2>
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="input"
        />
        <div className="buttonContainer">
          <button onClick={handleRegister} className="button">Register</button>
          <p>Already had an account</p>
          <button onClick={handleLogin} className="button">Login</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterLoginForm;

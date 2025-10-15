import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    navigate('/');
    return null;
  }
  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 1;

  const handleLogin = (e, role) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password cannot be empty (min 1 char).');
      return;
    }
    
    // Logica di accesso ADMIN specifica
    if (role === 'admin') {
      if (email === 'admin@admin.com' && password === 'admin') {
        login('admin');
        navigate('/');
      } else {
        setError('Invalid credentials for Admin access.');
      }
      return;
    }
    
    // Logica di accesso USER (finto)
    login('user');
    navigate('/');
  };

  return (
    <div className="parchment-container" style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Access the Ancient Library</h2>
      <p style={{ textAlign: 'center' }}>To access as **ADMIN**: user 'admin@admin.com', password 'admin'.</p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          style={{ padding: '10px', border: '1px solid #c9b78e', borderRadius: '3px' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 1 character)"
          style={{ padding: '10px', border: '1px solid #c9b78e', borderRadius: '3px' }}
        />
        
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
          <button 
            onClick={(e) => handleLogin(e, 'user')}
            style={{ padding: '10px 20px', fontSize: '1.1em', backgroundColor: '#bba375', color: '#3e321e', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}
          >
            Login as USER
          </button>
          <button 
            onClick={(e) => handleLogin(e, 'admin')}
            style={{ padding: '10px 20px', fontSize: '1.1em', backgroundColor: '#5d4037', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}
          >
            Login as ADMIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
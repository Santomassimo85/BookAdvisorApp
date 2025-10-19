import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // NUOVO BLOCCO useEffect: Gestisce il reindirizzamento in modo controllato.
  useEffect(() => {
    if (user) {
      // Reindirizza l'utente solo se lo stato 'user' è cambiato e non è null
      navigate('/');
    }
  }, [user, navigate]); // Dipende da 'user' e 'navigate'

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
        // NON CHIAMARE navigate() QUI. Lascia che useEffect lo faccia.
      } else {
        setError('Invalid credentials for Admin access.');
      }
      return;
    }
    
    // Logica di accesso USER (finto)
    login('user');
    // NON CHIAMARE navigate() QUI. Lascia che useEffect lo faccia.
  };

  // Se 'user' è già settato, non mostrare il form (useEffect gestirà la navigazione)
  if (user) {
    return (
        <div className="parchment-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Redirecting...</h2>
        </div>
    );
  }

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
          // Stili input omessi per brevità, ma usa quelli del tuo App.css
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 1 character)"
          // Stili input omessi
        />
        
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
          <button 
            onClick={(e) => handleLogin(e, 'user')}
            // Stili button omessi
          >
            Login as USER
          </button>
          <button 
            onClick={(e) => handleLogin(e, 'admin')}
            // Stili button omessi
          >
            Login as ADMIN
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
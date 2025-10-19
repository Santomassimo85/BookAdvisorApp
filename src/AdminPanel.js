import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { FaLock, FaEdit, FaCheckCircle } from 'react-icons/fa';

function AdminPanel() {
  const { user } = useAuth();
  const [bookId, setBookId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [message, setMessage] = useState('');

  if (user !== 'admin') {
    return (
      <div className="parchment-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2><FaLock /> Access Denied</h2>
        <p>You must be logged in as an **ADMIN** to view this panel. Log in to activate Dark Mode.</p>
      </div>
    );
  }

  const handleSimulateEdit = (e) => {
    e.preventDefault();
    if (!bookId || !newDescription) {
      setMessage('Book ID and Description are required.');
      return;
    }

    console.log(`Simulating update for Book ID: ${bookId} with new description: ${newDescription.substring(0, 50)}...`);
    
    // Simula il salvataggio: in una vera app qui ci sarebbe una chiamata API PUT
    localStorage.setItem(`admin_desc_${bookId}`, newDescription); 
    
    setMessage(`Successfully saved new description for Book ID: ${bookId}! (Simulated)`);
    setBookId('');
    setNewDescription('');
    setTimeout(() => setMessage(''), 3000);
  };
  
  const adminPanelStyle = {
      color: user === 'admin' ? '#FFD700' : '#5d4037',
      textAlign: 'center'
  };

  return (
    <div className="parchment-container" style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h1 style={adminPanelStyle}>Admin Panel: Content Management <FaEdit /></h1>
      <p style={{ textAlign: 'center', color: user === 'admin' ? '#E8E8E8' : '#3e321e' }}>
        Current Theme: **Dark Mode** is active for Admin.
      </p>
      <p>Simulate content editing, such as updating a book's description. Note: This change is local only.</p>
      
      <form onSubmit={handleSimulateEdit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        
        <label style={{ fontWeight: 'bold' }}>Book ID to Modify (e.g., K9z1sgAACAAJ):</label>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter the ID of the book to modify"
          style={{ padding: '10px', border: '1px solid #4C566A', borderRadius: '3px' }}
        />
        
        <label style={{ fontWeight: 'bold' }}>New Description:</label>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter the new, improved description for the book..."
          rows="6"
          style={{ padding: '10px', border: '1px solid #4C566A', borderRadius: '3px' }}
        />
        
        <button 
          type="submit" 
          style={{ padding: '10px 20px', backgroundColor: '#00BFFF', color: '#1C1C1C', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px' }}
        >
          <FaCheckCircle /> Simulate Save Changes
        </button>
      </form>
      
      {message && <p style={{ marginTop: '20px', color: message.includes('Successfully') ? '#A3BE8C' : '#BF616A', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default AdminPanel;
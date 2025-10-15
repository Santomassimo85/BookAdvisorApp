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

    // Qui salveremmo la nuova descrizione nel database reale.
    // Simuliamo l'operazione salvando un flag nel localStorage per BookID.
    
    // In un'app reale, useresti l'API per aggiornare il campo.
    console.log(`Simulating update for Book ID: ${bookId} with new description: ${newDescription.substring(0, 50)}...`);
    
    // Esempio di come potresti simulare il salvataggio di metadati per questo ID
    localStorage.setItem(`admin_desc_${bookId}`, newDescription); 
    
    setMessage(`Successfully saved new description for Book ID: ${bookId}! (Simulated)`);
    setBookId('');
    setNewDescription('');
    setTimeout(() => setMessage(''), 3000); // Pulisce il messaggio
  };
  
  // Per mostrare la coerenza del Dark Mode nell'Admin Panel
  const adminPanelStyle = {
      color: user === 'admin' ? '#88c0d0' : '#5d4037',
      textAlign: 'center'
  };

  return (
    <div className="parchment-container" style={{ maxWidth: '700px', margin: '50px auto' }}>
      <h1 style={adminPanelStyle}>Admin Panel: Content Management <FaEdit /></h1>
      <p style={{ textAlign: 'center', color: user === 'admin' ? '#d8dee9' : '#3e321e' }}>
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
          style={{ padding: '10px', border: '1px solid #4c566a', borderRadius: '3px', color: user === 'admin' ? '#d8dee9' : '#3e321e', backgroundColor: user === 'admin' ? '#3b4252' : 'white' }}
        />
        
        <label style={{ fontWeight: 'bold' }}>New Description:</label>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter the new, improved description for the book..."
          rows="6"
          style={{ padding: '10px', border: '1px solid #4c566a', borderRadius: '3px', color: user === 'admin' ? '#d8dee9' : '#3e321e', backgroundColor: user === 'admin' ? '#3b4252' : 'white' }}
        />
        
        <button 
          type="submit" 
          style={{ padding: '10px 20px', backgroundColor: '#88c0d0', color: '#1a1e24', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px' }}
        >
          <FaCheckCircle /> Simulate Save Changes
        </button>
      </form>
      
      {message && <p style={{ marginTop: '20px', color: message.includes('Successfully') ? '#a3be8c' : '#bf616a', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default AdminPanel;
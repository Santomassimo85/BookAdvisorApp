import React, { useState } from 'react';
import { FaBookOpen, FaGlobe, FaSearch } from 'react-icons/fa';

function ReadingRoom() {
  const [searchTerm, setSearchTerm] = useState('Fantasy novel reviews');
  const [searchQuery, setSearchQuery] = useState(null);

  const handleReviewSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };
  
  return (
    <div className="parchment-container">
      <h1 style={{ textAlign: 'center' }}><FaBookOpen /> The Reading Room</h1>
      <p style={{ textAlign: 'center', color: '#8d6e63' }}>A quiet corner for previews and curated web resources.</p>

      {/* Sezione 1: Anteprima Finta (Simulazione "Prime Pagine") */}
      <div style={{ marginTop: '40px', border: '1px solid #c9b78e', padding: '20px', borderRadius: '5px', backgroundColor: '#fffaf0' }}>
        <h2>Quick Preview: The First Page</h2>
        <p style={{ fontStyle: 'italic', borderLeft: '3px solid #bba375', paddingLeft: '15px' }}>
          "The dust motes danced in the single shaft of sunlight slicing through the ancient archives. It smelled of paper and forgotten time, a scent Silas had learned to equate with both boundless power and profound danger. He ran a gloved finger over the binding of a nameless tome, knowing that somewhere within its brittle pages lay the key not just to his past, but to the silence of the entire world. The silence was the worst part..."
        </p>
        <p style={{ textAlign: 'right', fontSize: '0.9em', marginTop: '15px', color: '#8d6e63' }}>— Excerpt from an Unpublished Manuscript.</p>
      </div>

      {/* Sezione 2: Ricerca Recensioni Online */}
      <div style={{ marginTop: '40px', borderTop: '2px dashed #c9b78e', paddingTop: '30px' }}>
        <h2><FaGlobe /> Search Online Reviews</h2>
        <p>Find community reviews and discussions for any book or topic. (Uses a simulated external search).</p>
        
        <form onSubmit={handleReviewSearch} style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., 'Reviews for Folium Favola'"
            style={{ flexGrow: 1, padding: '10px', border: '1px solid #c9b78e', borderRadius: '3px' }}
          />
          <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#5d4037', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}><FaSearch /></button>
        </form>
        
        {searchQuery && (
          <div style={{ marginTop: '20px', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '4px', backgroundColor: '#fdf8ec' }}>
            <h4 style={{ color: '#5d4037' }}>Simulated Search Results for: "{searchQuery}"</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '5px' }}>Top 10 Fantasy Blogs Discussing this Topic.</li>
              <li style={{ marginBottom: '5px' }}>Community Forum Threads on r/Books.</li>
              <li>A Comprehensive Video Review on YouTube.</li>
            </ul>
            <p style={{ fontSize: '0.8em', color: '#d9534f' }}>Disclaimer: This is a simulation. No external sites are actually loaded.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReadingRoom;
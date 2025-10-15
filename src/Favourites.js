import React from 'react';
import { useAuth } from './AuthContext';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importato Link

function Favourites() {
  const { user, favorites, toggleFavorite } = useAuth();

  if (!user) {
    return (
      <div className="parchment-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Access Denied</h2>
        <p>You must be logged in to view your favourite books.</p>
      </div>
    );
  }

  const FavoriteBookCard = ({ book }) => (
    <div className="book-card">
      <Link to={`/book/${book.id}`} state={{ bookData: book }} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
        <img src={book.image || 'placeholder.png'} alt={`Cover of ${book.title}`} />
        <div className="book-card-info">
          <h3>{book.title}</h3>
          <p>Author(s): **{book.authors}**</p>
          <p>Year: *{book.publishedDate}*</p>
          <span style={{ color: '#5d4037', fontWeight: 'bold', textDecoration: 'underline', marginTop: '5px', display: 'block' }}>Show Details</span>
        </div>
      </Link>
      
      <button 
        onClick={() => toggleFavorite(book)}
        className="fav-button"
        style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          color: '#d9534f', 
          fontSize: '1.5em' 
        }}
        title="Remove from Favourites"
      >
        <FaTimes />
      </button>
      <FaHeart style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#d9534f' }} />
    </div>
  );

  return (
    <div className="parchment-container">
      <h1 style={{ textAlign: 'center' }}>Your Favourite Manuscripts</h1>
      
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          Your personal library is empty. Add books you love from the catalogue!
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px', marginTop: '30px' }}>
          {favorites.map(book => (
            <FavoriteBookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
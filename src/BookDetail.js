import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaStar, FaArrowLeft } from 'react-icons/fa';

function BookDetail() {
  const { user, submitRating, getRating } = useAuth();
  const { bookId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const book = location.state?.bookData;
  const initialRating = getRating(bookId) || { rating: 0, feedback: '' };

  const [currentRating, setCurrentRating] = useState(initialRating.rating);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Effetto per sincronizzare lo stato con i dati salvati all'inizio del mount
  useEffect(() => {
    const currentSavedRating = getRating(bookId);
    if (currentSavedRating) {
        setCurrentRating(currentSavedRating.rating);
    }
  }, [bookId, getRating]);

  if (!book) {
    return (
      <div className="parchment-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Book Not Found</h2>
        <p>Could not load book details. Please return to the catalogue.</p>
        <button 
          onClick={() => navigate('/')} 
          style={{ padding: '10px 20px', backgroundColor: '#B89B6A', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    if (user !== 'user' || currentRating === 0) return; 
    
    submitRating(bookId, { rating: currentRating, feedback });
    
    setIsSubmitted(true);
    setFeedback(''); 
    setTimeout(() => setIsSubmitted(false), 3000); 
  };
  
  const renderStars = (isInteractive) => (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        // Usa currentRating per l'input, usa displayRating.rating per la visualizzazione statica
        const starRating = isInteractive ? currentRating : displayRating.rating;
        
        return (
          <FaStar 
            key={i} 
            color={ratingValue <= starRating ? '#ffc107' : '#e4e5e9'} 
            size={isInteractive ? 30 : 20}
            style={{ cursor: isInteractive ? 'pointer' : 'default', transition: 'color 0.2s' }}
            onClick={isInteractive ? () => setCurrentRating(ratingValue) : null}
          />
        );
      })}
    </div>
  );
  
  const ratingData = getRating(bookId); 
  const displayRating = ratingData || { rating: 0, feedback: 'No user feedback yet.' };
  const isUser = user === 'user';
  
  // Controlla per la copertina e per la descrizione in modo sicuro
  const coverUrl = book.fullInfo?.imageLinks?.thumbnail || 'placeholder.png';
  const descriptionText = book.fullInfo?.description || book.description || 'No detailed description available.';

  return (
    <div className="parchment-container detail-section" style={{ padding: '40px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5d4037', marginBottom: '20px', fontWeight: 'bold' }}
      >
        <FaArrowLeft /> Back to Catalogue
      </button>

      <div className="book-detail-flex" style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flexShrink: 0 }}>
          <img 
            src={coverUrl} 
            alt={`Cover of ${book.title}`} 
            style={{ width: '250px', height: 'auto', border: '3px solid #B89B6A', boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2)' }} 
          />
          <h3 style={{ marginTop: '20px', color: '#5d4037' }}>User Rating:</h3>
          {renderStars(false)}
        </div>
        
        <div>
          <h1>{book.title}</h1>
          <h3 style={{ color: '#B89B6A' }}>By: {book.authors}</h3>
          <p>
            **Published Year:** {book.publishedDate} <br />
            **Type:** {book.type} <br />
            **Pages:** {book.fullInfo?.pageCount || 'N/A'}
          </p>
          
          <h3 style={{ marginTop: '30px' }}>Description</h3>
          <p>{descriptionText}</p>
        </div>
      </div>
      
      {/* SEZIONE VALUTAZIONE E FEEDBACK */}
      <div style={{ marginTop: '40px', borderTop: '2px dashed #B89B6A', paddingTop: '30px' }}>
        <h2>User Feedback and Rating</h2>
        
        {isUser && (
          <form onSubmit={handleRatingSubmit} className="parchment-container" style={{ padding: '20px', border: '1px solid #B89B6A' }}>
            <h3 style={{ color: '#5d4037' }}>Submit Your Rating:</h3>
            <div style={{ marginBottom: '15px' }}>
              {renderStars(true)}
            </div>
            
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Leave your review here..."
              rows="4"
              style={{ width: '100%', padding: '10px', border: '1px solid #B89B6A', borderRadius: '3px', boxSizing: 'border-box' }}
            />
            <button 
              type="submit" 
              disabled={currentRating === 0}
              style={{ padding: '10px 20px', backgroundColor: '#5D4037', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold', marginTop: '10px' }}
            >
              Submit Rating
            </button>
            {isSubmitted && <span style={{ marginLeft: '15px', color: 'green' }}>Thank you for your feedback!</span>}
          </form>
        )}
        
        {!isUser && <p style={{ color: '#d9534f' }}>Only logged-in **Users** can submit ratings and feedback.</p>}
        
        {/* Visualizzazione del feedback salvato */}
        {displayRating.feedback && displayRating.feedback !== 'No user feedback yet.' && (
          <div style={{ marginTop: '30px', border: '1px solid #B89B6A', padding: '15px', borderRadius: '4px', backgroundColor: '#fdf8ec' }}>
            <h4 style={{ color: '#5d4037' }}>Latest Review:</h4>
            <p>Rating: **{displayRating.rating}/5**</p>
            <p style={{ fontStyle: 'italic' }}>"{displayRating.feedback}"</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default BookDetail;
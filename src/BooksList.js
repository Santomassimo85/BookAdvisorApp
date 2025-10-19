import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { FaHeart, FaRegHeart, FaSearch, FaSortAlphaDown, FaSortNumericDown, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function BooksList() {
  const { user, isFavorite, toggleFavorite, getRating } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('react programming');
  const [query, setQuery] = useState('react programming');
  const [sortBy, setSortBy] = useState('title');
  const [animateFavId, setAnimateFavId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.length < 3) return;

      setLoading(true);
      const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=30`;
      
      try {
        const response = await fetch(URL);
        const data = await response.json();
        
        let fetchedBooks = data.items ? data.items.map(item => ({
          id: item.id,
          title: item.volumeInfo.title || 'Unknown Title',
          authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
          publishedDate: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate.substring(0, 4) : 'N/A',
          // Recupero della tipologia (categoria)
          type: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'General Literature', 
          // Optional chaining per l'immagine
          image: item.volumeInfo.imageLinks?.smallThumbnail || null, 
          infoLink: item.volumeInfo.infoLink,
          description: item.volumeInfo.description || "No description available.",
          fullInfo: item.volumeInfo // Salviamo il fullInfo per la pagina di dettaglio
        })) : [];

        fetchedBooks.sort((a, b) => {
          const aVal = a[sortBy] || '';
          const bVal = b[sortBy] || '';
          if (sortBy === 'publishedDate') {
            return bVal - aVal;
          }
          return aVal.localeCompare(bVal);
        });

        setBooks(fetchedBooks);

      } catch (e) {
        console.error("Error fetching books:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [query, sortBy]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  
  const handleFavClick = (book) => {
    const wasFavorite = isFavorite(book.id);
    toggleFavorite(book);
    
    // Attiva l'animazione solo se il libro viene aggiunto
    if (!wasFavorite) {
        setAnimateFavId(book.id);
        setTimeout(() => setAnimateFavId(null), 500);
    }
  };

  const BookCard = ({ book }) => {
    const ratingData = getRating(book.id);
    const starCount = ratingData ? ratingData.rating : 0;
    const isFav = isFavorite(book.id);
    const favButtonClass = `fav-button ${animateFavId === book.id ? 'active-animation' : ''}`;

    return (
      <div className="book-card">
        <Link to={`/book/${book.id}`} state={{ bookData: book }}>
          <img src={book.image || 'placeholder.png'} alt={`Cover of ${book.title}`} />
          <div className="book-card-info">
            <h3>{book.title}</h3>
            <p>Author(s): **{book.authors}**</p>
            <p>Year: *{book.publishedDate}*</p>
            <p>Type: **{book.type}**</p> 

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < starCount ? '#ffc107' : '#e4e5e9'} style={{ marginRight: '2px' }} />
              ))}
              {starCount > 0 && <span style={{ fontSize: '0.9em', marginLeft: '5px' }}>({starCount}/5)</span>}
            </div>
          </div>
        </Link>
        
        {user && (
          <button 
            onClick={() => handleFavClick(book)}
            className={favButtonClass}
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: isFav ? '#d9534f' : 'inherit', 
              fontSize: '1.5em',
              zIndex: 10
            }}
          >
            {isFav ? <FaHeart /> : <FaRegHeart />}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="parchment-container">
      <h1>Catalogue and Book Search</h1>
      <p style={{ color: '#5d4037' }}>{user ? `Welcome, ${user.toUpperCase()}. Click the heart to add to favourites.` : 'Please log in to save favourites.'}</p>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, author, or topic (min. 3 characters)"
          style={{ flexGrow: 1, padding: '10px', border: '1px solid #c9b78e', borderRadius: '3px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#B89B6A', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px', fontFamily: 'Cinzel Decorative, serif' }}>
          <FaSearch style={{ marginRight: '5px' }}/> Search
        </button>
      </form>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px', color: '#5d4037' }}>
        <span>Sort by:</span>
        <button 
          onClick={() => setSortBy('title')} 
          style={{ backgroundColor: sortBy === 'title' ? '#5D4037' : '#B89B6A', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'Cinzel Decorative, serif' }}
        >
          <FaSortAlphaDown /> Title
        </button>
        <button 
          onClick={() => setSortBy('authors')} 
          style={{ backgroundColor: sortBy === 'authors' ? '#5D4037' : '#B89B6A', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'Cinzel Decorative, serif' }}
        >
          <FaSortAlphaDown /> Author
        </button>
        <button 
          onClick={() => setSortBy('publishedDate')} 
          style={{ backgroundColor: sortBy === 'publishedDate' ? '#5D4037' : '#B89B6A', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '3px', cursor: 'pointer', fontFamily: 'Cinzel Decorative, serif' }}
        >
          <FaSortNumericDown /> Year (Recent)
        </button>
      </div>

      {loading && (
        <div className="loading-spinner">
            <div className="book-spinner"></div>
        </div>
      )}
      
      {!loading && books.length === 0 && query.length >= 3 && <p style={{ textAlign: 'center' }}>No manuscripts found for "{query}".</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default BooksList;
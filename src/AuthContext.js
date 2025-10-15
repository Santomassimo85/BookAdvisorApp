import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('userRole') || null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('bookFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem('bookRatings');
    return savedRatings ? JSON.parse(savedRatings) : {};
  });

  useEffect(() => {
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('bookRatings', JSON.stringify(ratings));
  }, [ratings]);

  const login = (role) => {
    localStorage.setItem('userRole', role);
    setUser(role);
  };

  const logout = () => {
    localStorage.removeItem('userRole');
    setUser(null);
  };

  const toggleFavorite = (book) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === book.id)) {
        return prev.filter(fav => fav.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  const isFavorite = (bookId) => favorites.some(fav => fav.id === bookId);

  const submitRating = (bookId, ratingData) => {
    setRatings(prev => ({
      ...prev,
      [bookId]: ratingData
    }));
  };

  const getRating = (bookId) => ratings[bookId];

  return (
    <AuthContext.Provider value={{ user, login, logout, favorites, toggleFavorite, isFavorite, submitRating, getRating }}>
      {children}
    </AuthContext.Provider>
  );
};
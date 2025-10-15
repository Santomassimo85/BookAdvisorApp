import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import NavMenu from './NavMenu';
import Login from './Login';
import BooksList from './BooksList'; 
import Favourites from './Favourites'; 
import BookDetail from './BookDetail'; 
import AdminPanel from './AdminPanel'; 
import './App.css'; 

// Componente Wrapper per applicare il tema in base all'utente
function AppContent() {
  const { user } = useAuth();
  // Applica la classe 'admin-dark' se l'utente è 'admin'
  const appClassName = user === 'admin' ? 'App admin-dark' : 'App';
  
  return (
    <div className={appClassName}>
      <NavMenu />
      <div className="content">
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
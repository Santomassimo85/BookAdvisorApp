import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import NavMenu from './NavMenu';
import Login from './Login';
import BooksList from './BooksList'; 
import Favourites from './Favourites'; 
import BookDetail from './BookDetail'; 
import AdminPanel from './AdminPanel'; 
import ReadingRoom from './ReadingRoom'; // NUOVO COMPONENTE
import './App.css'; 

function AppContent() {
  const { user } = useAuth();
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
          <Route path="/reading-room" element={<ReadingRoom />} /> {/* NUOVA ROUTE */}
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
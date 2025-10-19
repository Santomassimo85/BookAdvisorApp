import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { AnimatePresence } from 'framer-motion';
import NavMenu from './NavMenu';
import Login from './Login';
import BooksList from './BooksList'; 
import Favourites from './Favourites'; 
import BookDetail from './BookDetail'; 
import AdminPanel from './AdminPanel'; 
import ReadingRoom from './ReadingRoom';
import PageTransitionWrapper from './PageTransitionWrapper';
import './App.css'; 

// Componente che contiene il router per usare useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={<PageTransitionWrapper><BooksList /></PageTransitionWrapper>} />
        <Route path="/login" element={<PageTransitionWrapper><Login /></PageTransitionWrapper>} />
        <Route path="/favourites" element={<PageTransitionWrapper><Favourites /></PageTransitionWrapper>} />
        <Route path="/book/:bookId" element={<PageTransitionWrapper><BookDetail /></PageTransitionWrapper>} />
        <Route path="/admin" element={<PageTransitionWrapper><AdminPanel /></PageTransitionWrapper>} />
        <Route path="/reading-room" element={<PageTransitionWrapper><ReadingRoom /></PageTransitionWrapper>} />

      </Routes>
    </AnimatePresence>
  );
}


function AppContent() {
  const { user } = useAuth();
  const appClassName = user === 'admin' ? 'App admin-dark' : 'App';
  
  return (
    <div className={appClassName}>
      <NavMenu />
      <div className="content">
        <AnimatedRoutes />
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
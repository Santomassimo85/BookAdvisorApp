import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'; 

function NavMenu() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); 
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Attiva l'animazione di ingresso dopo 300ms dal caricamento
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const getLinkClass = (path) => {
    let className = 'nav-link';
    if (location.pathname === path) {
      className += ' nav-link-active';
    }
    return className;
  };

  const handleLinkClick = () => setIsOpen(false);
  const handleLogoutClick = () => {
    logout();
    setIsOpen(false);
  };

  // Effetto flip 3D per ogni lettera, con animazione di entrata
  const FlipLink = ({ to, children, className, onClick }) => {
    const text = children.toString().split('');
    return (
      <Link to={to} className={className} onClick={onClick}>
        <div className={`nav-link-flip-effect ${loaded ? 'loaded' : ''}`}>
          {text.map((letter, index) => (
            <span key={index} style={{ '--i': index }}>
              {letter}
            </span>
          ))}
        </div>
      </Link>
    );
  };

  return (
    <nav className="nav-menu">
      <div className="logo-text">Whispering Pages</div>

      <ul className="nav-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {/* <FlipLink to="/" className={getLinkClass('/')} onClick={handleLinkClick}>
          Whispering Pages
        </FlipLink> */}

        <div className="burger-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-links-container ${isOpen ? 'open' : ''}`}>
          <div className="nav-group-links">
            <li>
              <FlipLink to="/reading-room" className={getLinkClass('/reading-room')} onClick={handleLinkClick}>
                Reading Room
              </FlipLink>
            </li>
            <li>
              <FlipLink to="/" className={getLinkClass('/')} onClick={handleLinkClick}>
                Catalogue
              </FlipLink>
            </li>
            {user && (
              <li>
                <FlipLink to="/favourites" className={getLinkClass('/favourites')} onClick={handleLinkClick}>
                  My Favourites
                </FlipLink>
              </li>
            )}
            {user === 'admin' && (
              <li>
                <FlipLink to="/admin" className={getLinkClass('/admin')} onClick={handleLinkClick}>
                  Admin Panel
                </FlipLink>
              </li>
            )}
          </div>

          <div className="nav-group-auth">
            {user ? (
              <>
                <span style={{ fontSize: '0.9em', color: 'white'}}>Access: {user.toUpperCase()}</span>
                <button
                  onClick={handleLogoutClick}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#B89B6A',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '3px'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <li>
                <FlipLink to="/login" className={getLinkClass('/login')} onClick={handleLinkClick}>
                  Login / Register
                </FlipLink>
              </li>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default NavMenu;

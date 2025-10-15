import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'; 

function NavMenu() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); 

  const getLinkClass = (path) => {
    let className = 'nav-link';
    if (location.pathname === path) {
      className += ' nav-link-active';
    }
    return className;
  };

  const handleLinkClick = () => {
    setIsOpen(false); 
  };
  
  const handleLogoutClick = () => {
      logout();
      setIsOpen(false);
  };
  
  // Rimosso lo stile inline che forzava la colonna

  return (
    <nav className="nav-menu">
      <ul className="nav-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {/* Logo finto o titolo, fisso a sinistra */}
        <p>Welcome to <span style={{ fontWeight: '900', color: '#D4AF37', fontSize: '1.4em' }}>Whispering Pages</span>
        </p>
        {/* Icona Burger/Close per mobile */}
        <div className="burger-menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        
        {/* Contenitore dei Link */}
        <div className={`nav-links-container ${isOpen ? 'open' : ''}`}>
          
          <div className="nav-group-links"> {/* Gruppo 1: I Link */}
             <li><Link to="/reading-room" className={getLinkClass('/reading-room')} onClick={handleLinkClick}>Reading Room</Link></li>
             
             <li><Link to="/" className={getLinkClass('/')} onClick={handleLinkClick}>Catalogue</Link></li>
             
             {user && <li><Link to="/favourites" className={getLinkClass('/favourites')} onClick={handleLinkClick}>My Favourites</Link></li>}
             
             {user === 'admin' && <li><Link to="/admin" className={getLinkClass('/admin')} onClick={handleLinkClick}>Admin Panel</Link></li>}
          </div>
          
          {/* Gruppo 2: Login/Logout (per desktop si allinea al resto) */}
          <div className="nav-group-auth" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {user ? (
              <>
                <span style={{ fontSize: '0.9em' }}>Access: {user.toUpperCase()}</span>
                <button onClick={handleLogoutClick} style={{ padding: '5px 10px', backgroundColor: '#b4945cff', fontWeight: 700, color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}>
                  Logout
                </button>
              </>
            ) : (
              <li><Link to="/login" className={getLinkClass('/login')} onClick={handleLinkClick}>Login / Register</Link></li>
            )}
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default NavMenu;
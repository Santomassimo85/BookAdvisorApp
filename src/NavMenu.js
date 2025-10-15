import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function NavMenu() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getLinkClass = (path) => {
    let className = 'nav-link';
    if (location.pathname === path) {
      className += ' nav-link-active';
    }
    return className;
  };

  return (
    <nav className="nav-menu">
      <ul className="nav-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <li><Link to="/" className={getLinkClass('/')}>Book Catalogue</Link></li>
          {user && <li><Link to="/favourites" className={getLinkClass('/favourites')}>My Favourites</Link></li>}
          {user === 'admin' && <li><Link to="/admin" className={getLinkClass('/admin')}>Admin Panel</Link></li>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user ? (
            <>
              <span style={{ fontSize: '0.9em', color: 'inherit' }}>Access: {user.toUpperCase()}</span>
              <button onClick={logout} style={{ padding: '5px 10px', backgroundColor: '#8d6e63', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '3px' }}>
                Logout
              </button>
            </>
          ) : (
            <li><Link to="/login" className={getLinkClass('/login')}>Login / Register</Link></li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavMenu;
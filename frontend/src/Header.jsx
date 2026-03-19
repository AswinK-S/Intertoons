import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './context/CartContext';

const Header = () => {
  const { cartItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container flex items-center justify-between" style={{ height: '72px' }}>
        <Link to="/" className="flex items-center gap-sm" style={{ color: '#fff' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'linear-gradient(135deg, var(--accent-color), #246bf7)',
            borderRadius: 'var(--radius-md)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 14px 0 rgba(88, 166, 255, 0.3)'
          }}>
            E
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', display: 'none', '@media(minWidth: 768px)': { display: 'block'} }}>ElegantCart</span>
        </Link>
        
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '500px', margin: '0 24px' }}>
          <div style={{ position: 'relative' }}>
            <svg style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search premium products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                borderRadius: '24px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-color)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                transition: 'border-color var(--transition-fast)'
              }}
            />
          </div>
        </form>
        
        <nav className="flex gap-lg items-center">
          <Link to="/" style={{ 
            color: location.pathname === '/' ? '#fff' : 'var(--text-secondary)',
            fontWeight: location.pathname === '/' ? 600 : 500
          }}>
            Products
          </Link>
          <Link to="/cart" className="flex items-center gap-sm" style={{ 
            color: location.pathname === '/cart' ? '#fff' : 'var(--text-secondary)',
            fontWeight: location.pathname === '/cart' ? 600 : 500,
            position: 'relative'
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span style={{ display: 'none', '@media(minWidth: 768px)': { display: 'inline'} }}>Cart</span>
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-16px',
                background: 'var(--danger-color)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '2px 6px',
                borderRadius: '12px',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

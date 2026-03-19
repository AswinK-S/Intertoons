import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', height: '80px', 
          background: 'var(--bg-card)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '24px', color: 'var(--text-secondary)'
        }}>
          <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
          Looks like you haven't added anything to your cart yet. Explore our top-tier catalog.
        </p>
        <Link to="/" className="btn btn-primary" style={{ padding: '12px 32px' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex gap-xl" style={{ alignItems: 'flex-start' }}>
      <div style={{ flex: '1 1 60%' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <h1 style={{ fontSize: '2rem' }}>Shopping Cart</h1>
          <span style={{ color: 'var(--text-secondary)' }}>{cart.length} Items</span>
        </div>

        <div className="flex flex-col gap-md">
          {cart.map(item => (
            <div key={item._id} style={{ 
              display: 'flex', gap: '20px', padding: '16px',
              background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)', alignItems: 'center'
            }}>
              <img src={item.imageUrl} alt={item.name} style={{
                width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-md)'
              }} />
              
              <div style={{ flex: 1 }}>
                <Link to="/" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
                  {item.name}
                </Link>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                  {item.category}
                </div>
                
                <div className="flex items-center gap-md">
                  <div className="flex items-center" style={{ 
                    background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)'
                  }}>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      style={{ padding: '6px 12px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                    >-</button>
                    <span style={{ padding: '0 12px', fontWeight: 600 }}>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      style={{ padding: '6px 12px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                    >+</button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    style={{ color: 'var(--danger-color)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                {item.quantity > 1 && (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    ${item.price.toFixed(2)} each
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={clearCart}
          className="btn"
          style={{ marginTop: '24px', background: 'transparent', color: 'var(--text-secondary)' }}
        >
          Clear Cart
        </button>
      </div>
      
      <div style={{ 
        flex: '1 1 35%', position: 'sticky', top: '100px',
        background: '#161b22', padding: '32px', borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>Order Summary</h2>
        
        <div className="flex justify-between" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          <span>Subtotal</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between" style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          <span>Shipping</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>Free</span>
        </div>
        <div className="flex justify-between" style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
          <span>Tax</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>${(cartTotal * 0.08).toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between" style={{ 
          marginBottom: '32px', paddingTop: '16px', borderTop: '1px solid var(--border-color)',
          fontSize: '1.25rem', fontWeight: 800, color: '#fff'
        }}>
          <span>Total</span>
          <span style={{ color: 'var(--accent-color)' }}>${(cartTotal * 1.08).toFixed(2)}</span>
        </div>
        
        <button className="btn btn-primary w-full" style={{ padding: '16px', fontSize: '1.1rem' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

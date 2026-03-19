import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../ProductCard';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  // Dummy fallback data in case DB is not running
  const fallbackProducts = [
    {
      _id: '1', name: 'Classic White Sneakers', description: 'Minimalist and comfortable white sneakers crafted from premium synthetic leather. Perfect for everyday casual wear.', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Footwear'
    },
    {
      _id: '2', name: 'Noise Cancelling Headphones', description: 'Immersive sound experience with active noise cancellation.', price: 249.00, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Electronics'
    },
    {
      _id: '3', name: 'Minimalist Wristwatch', description: 'Elegant timepiece with a sleek black dial and genuine leather strap.', price: 125.50, imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Accessories'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const url = category ? `${API_BASE}/products?category=${category}` : `${API_BASE}/products`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.warn('Backend unavailable, using fallback products');
        // If API fails, filter the fallback products manually
        let fallback = fallbackProducts;
        if (category) {
          fallback = fallback.filter(p => p.category === category);
        }
        setProducts(fallback);
        setError('Backend is not running. Displaying offline demo data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const displayedProducts = products.filter(p => {
    if (!searchQuery) return true;
    const lowerQuery = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery);
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Collection'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Discover premium products crafted for excellence.
          </p>
        </div>
        
        <div style={{ width: '200px' }}>
          <select 
            value={category} 
            onChange={(e) => {
              setCategory(e.target.value);
              if (searchQuery) {
                navigate(location.pathname);
              }
            }}
            style={{ 
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23c9d1d9\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              backgroundSize: '16px'
            }}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
      </div>

      {error && (
        <div style={{ 
          background: 'rgba(234, 179, 8, 0.1)', 
          border: '1px solid #ca8a04', 
          color: '#eab308', 
          padding: '12px 16px', 
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px' 
        }}>
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center" style={{ padding: '64px 0' }}>
          <div style={{ 
            width: '40px', height: '40px', 
            border: '4px solid var(--border-color)', 
            borderTopColor: 'var(--accent-color)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {displayedProducts.length > 0 ? (
            displayedProducts.map(product => (
              <ProductCard key={product._id || product.name} product={product} />
            ))
          ) : (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
              No products found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductListing;

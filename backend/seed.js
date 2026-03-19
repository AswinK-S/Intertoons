const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// Sample real-looking products with professional stock-like image placeholders
const sampleProducts = [
  {
    name: 'Classic White Sneakers',
    description: 'Minimalist and comfortable white sneakers crafted from premium synthetic leather. Perfect for everyday casual wear.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Footwear'
  },
  {
    name: 'Noise Cancelling Headphones',
    description: 'Immersive sound experience with active noise cancellation, boasting a 30-hour battery life and supreme comfort.',
    price: 249.00,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  },
  {
    name: 'Minimalist Wristwatch',
    description: 'Elegant timepiece with a sleek black dial and genuine leather strap. Water-resistant up to 30 meters.',
    price: 125.50,
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'High-back mesh chair providing optimal lumbar support. Fully adjustable for maximum productivity.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Furniture'
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall vacuum insulated water bottle keeping drinks cold for 24 hours or hot for 12 hours.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  },
  {
    name: 'Smartphone Pro Max',
    description: 'The latest flagship smartphone featuring a stunning OLED display, pro-grade camera system, and ultra-fast processor.',
    price: 1099.00,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  }
];

const seedDatabase = async () => {
  try {
    console.log('--- Seeding Started ---');
    console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
    
    if (process.env.MONGO_URI) {
      const maskedUri = process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@');
      console.log('Attempting to connect to:', maskedUri);
    } else {
      console.error('ERROR: MONGO_URI is missing or not loaded from .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    await Product.deleteMany();
    console.log('Cleared existing products.');

    await Product.insertMany(sampleProducts);
    console.log('Database successfully seeded!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

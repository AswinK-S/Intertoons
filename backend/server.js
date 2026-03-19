const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Restrict purely to the frontend React app
  methods: ['GET'],                // Only allow GET requests for products right now
  credentials: true
}));
app.use(express.json());

console.log('--- MongoDB Connection Check ---');
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
if (process.env.MONGO_URI) {
  const maskedUri = process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@');
  console.log('Using URI:', maskedUri);
} else {
  console.log('ERROR: MONGO_URI is missing from .env');
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('\n--- MongoDB Connection Error ---');
  console.error('Error Name:', err.name);
  console.error('Error Message:', err.message);
  console.error('Full Error Object:', err);
  console.error('--------------------------------\n');
});

// Routes
// Get all products, optionally filtered by category
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

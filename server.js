// ==========================================
// Product CRUD API (Node.js + Express + MongoDB)
// Versioned API (v1)
// ==========================================

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Database Schema =====
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  price: { type: Number, required: true },
  category: { type: String, default: 'Uncategorized' },
  stock: { type: Number, min: 0, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// ===== Routes =====

// Root route
app.get('/api/v1', (req, res) => {
  res.json({
    message: '✅ Product CRUD API v1 is up and running!',
    endpoints: {
      list: 'GET /api/v1/products',
      create: 'POST /api/v1/products',
      getOne: 'GET /api/v1/products/:id',
      update: 'PUT /api/v1/products/:id',
      delete: 'DELETE /api/v1/products/:id'
    }
  });
});

// Create product
app.post('/api/v1/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read all products
app.get('/api/v1/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read single product
app.get('/api/v1/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
});

// Update product
app.put('/api/v1/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully!', product: updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
app.delete('/api/v1/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: '🗑️ Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid product ID' });
  }
});

// ===== MongoDB Connection =====
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

startServer();
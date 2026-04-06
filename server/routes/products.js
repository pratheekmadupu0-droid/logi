const express = require('express');
const router = express.Router();

// Mock Products
const PRODUCTS = [
  { id: '1', name: 'Pure Whey Protein Isolate', price: 49.99, category: 'Protein', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=800' },
  { id: '2', name: 'Advanced Daily Multivitamin', price: 29.99, category: 'Vitamins', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1584017945391-5fe1f08ca26a?auto=format&fit=crop&q=80&w=800' },
  { id: '3', name: 'Creatine Monohydrate Elite', price: 34.99, category: 'Supplements', rating: 4.7, reviews: 215, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800' },
  { id: '4', name: 'Organic Plant-Based Protein', price: 54.99, category: 'Protein', rating: 4.6, reviews: 56, image: 'https://images.unsplash.com/photo-1579722820308-d74e5719d23e?auto=format&fit=crop&q=80&w=800' }
];

// GET: All products
router.get('/', (req, res) => {
  res.json(PRODUCTS);
});

// GET: Single product
router.get('/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

module.exports = router;

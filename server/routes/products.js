const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../products.json');

// Helper to read products
const readProducts = () => {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write products
const writeProducts = (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

// Get All Products (GET /api/products)
router.get('/', (req, res) => {
    try {
        const products = readProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error reading products" });
    }
});

// Get Single Product Detail (GET /api/products/:id)
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const products = readProducts();
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error reading product detail" });
    }
});

// Update Product (PUT /api/products/:id) - Used by Admin
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        let products = readProducts();
        
        products = products.map(p => p.id === parseInt(id) ? { ...p, ...updatedProduct } : p);
        writeProducts(products);
        
        res.json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Error updating product" });
    }
});

// Add New Product
router.post('/', (req, res) => {
    try {
        const newProduct = { ...req.body, id: Date.now() };
        let products = readProducts();
        products.push(newProduct);
        writeProducts(products);
        res.json({ message: "Product added", product: newProduct });
    } catch (err) {
        res.status(500).json({ message: "Error adding product" });
    }
});

module.exports = router;

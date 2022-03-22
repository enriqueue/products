const express = require('express');

const { Router } = require('express');

const { newProduct, getProducts, updateProduct, getProduct, deleteProduct } = require('../controllers/productController');

const router = Router();

router.post('/', newProduct);

router.get('/', getProducts);

router.put('/:id', updateProduct);

router.get('/:id', getProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
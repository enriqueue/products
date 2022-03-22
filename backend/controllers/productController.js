const Product = require('../models/Product');

const newProduct = async (req, res) =>{ 

    try {
        let product = new Product(req.body);
        await product.save();
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const updateProduct = async (req, res) => {

    try {

        const { name, category, location, price } = req.body;

        let product = await Product.findById(req.params.id);
        
        if (!product) {
            res.status(404).json({ msg: 'Not found' });
        }

        product.name = name;
        product.category = category;
        product.location = location;
        product.price = price;

        product = await Product.findOneAndUpdate(
            { _id: req.params.id },
            product,
            { new: true });
        
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const getProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ msg: 'Not found' });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}

const deleteProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ msg: 'Not found' });
        }
        await Product.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Product removed with exit' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error');
    }
}


module.exports = {
    newProduct,
    getProducts, 
    updateProduct,
    getProduct,
    deleteProduct
}
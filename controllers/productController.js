const asyncHandler = require('express-async-handler');
const { Product } = require('../models/product');

const createProduct = asyncHandler(async (req, res) => {
    try {
        const { _id, who, userName } = req.user;
        const { productName, price, img } = req.body;
        if (!productName || !price || !img)
            throw new Error('not data from client');
        if (who !== 'user') throw new Error('not user');
        const product = await Product.create({
            productName,
            price,
            userId: _id,
            img,
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const userId = req.query.userId;
        const products = userId
            ? await Product.find({ userId })
            : await Product.find({});

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllProductNoTran = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({
            transport: false,
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllProductShipper = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.user;
        const products = await Product.find({
            transport: true,
            shipperId: _id,
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getProduct = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;
        const product = await Product.findById({ _id });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const transportProduct = asyncHandler(async (req, res) => {
    try {
        const { shipperId, transportFee, productId } = req.body;

        if (!shipperId || !transportFee) throw new Error('body validate');
        const product = await Product.findById(productId);
        if (!product) throw new Error('not product in db');

        product.transport = true;
        product.shipperId = shipperId;
        product.transportFee = transportFee;

        const newProduct = await product.save();

        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    createProduct,
    getAllProduct,
    transportProduct,
    getProduct,
    getAllProductNoTran,
    getAllProductShipper,
};

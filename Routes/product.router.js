const express = require('express');
const {
    createProduct,
    getAllProduct,
    transportProduct,
    getProduct,
    getAllProductNoTran,
    getAllProductShipper,
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth.middleware');

const productRouter = express.Router();

productRouter.get('/', getAllProduct);
productRouter.get('/get-all-product-no-tran', getAllProductNoTran);
productRouter.get('/get-all-product-shipper', protect, getAllProductShipper);

productRouter.get('/:_id', getProduct);

productRouter.post('/create-product', protect, createProduct);
productRouter.patch('/transport', transportProduct);

module.exports = {
    productRouter,
};

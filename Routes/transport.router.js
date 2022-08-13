const { Router } = require('express');
const {
    shipAuction,
    getAllTranShipper,
    getAllTranProduct,
} = require('../controllers/transport.controller');
const { protect } = require('../middlewares/auth.middleware');
const tranRouter = Router();

tranRouter.post('/auction', protect, shipAuction);
tranRouter.get('/get-all', protect, getAllTranShipper);
tranRouter.get('/get-all-product/:_id', getAllTranProduct);

module.exports = {
    tranRouter,
};

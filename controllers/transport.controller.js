const asyncHandler = require('express-async-handler');
const { Transport } = require('../models/transport');

const shipAuction = asyncHandler(async (req, res) => {
    try {
        const { _id, who, confirmShipper } = req.user;
        console.log(req.user);
        const { productId, priceTran } = req.body;
        if (!productId || !priceTran)
            throw new Error('validate data from client');
        if (who !== 'shipper') throw new Error('not shipper');
        if (await Transport.findOne({ shipperId: _id, productId }))
            throw new Error('Auction is selected');
        const tran = await Transport.create({
            productId,
            shipperId: _id,
            priceTran,
        });

        res.json(tran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllTranShipper = asyncHandler(async (req, res) => {
    try {
        const { _id, who, confirmShipper } = req.user;
        if (who !== 'shipper') throw new Error('not shipper');

        const trans = await Transport.find({ shipperId: _id });

        res.json(trans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getAllTranProduct = asyncHandler(async (req, res) => {
    try {
        const { _id } = req.params;

        const trans = await Transport.find({ productId: _id });

        res.json(trans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    shipAuction,
    getAllTranShipper,
    getAllTranProduct,
};

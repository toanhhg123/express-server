const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    transport: {
        type: Boolean,
        default: false,
    },
    shipperId: {
        type: Schema.Types.ObjectId,
    },
    transportFee: {
        type: Number,
        default: 0,
    },
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
    },
});

const Product = mongoose.model('product', productSchema);
module.exports = {
    Product,
};

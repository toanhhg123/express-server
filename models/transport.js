const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transportSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
    },
    shipperId: {
        type: Schema.Types.ObjectId,
    },
    priceTran: {
        type: Number,
    },
});

const Transport = mongoose.model('transport', transportSchema);
module.exports = {
    Transport,
};

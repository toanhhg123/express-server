const monggoose = require('mongoose');
const db = process.env.DB;

const connectDb = async () => {
    try {
        const conn = await monggoose.connect(db);
        console.log('connect success ');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    connectDb,
};

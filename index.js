require('dotenv').config();
const express = require('express');

const cors = require('cors');
const { connectDb } = require('./db/connect');
const { userRouter } = require('./Routes/user.router');
const { productRouter } = require('./Routes/product.router');
const { tranRouter } = require('./Routes/transport.router');

const port = process.env.PORT || 5051;

connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/tran', tranRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

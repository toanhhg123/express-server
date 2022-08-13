const express = require('express');
const {
    register,
    login,
    registerShipper,
    confirmShipperAdmin,
    seederAdmin,
    loginShipper,
    getShipperNoConfirm,
} = require('../controllers/user.controler');
const { protect } = require('../middlewares/auth.middleware');

const userRouter = express.Router();
userRouter.get('/get-shipper-no-confirm', protect, getShipperNoConfirm);
userRouter.post('/login-shipper', loginShipper);
userRouter.post('/register-shipper', registerShipper);
userRouter.post('/register', register);

userRouter.post('/login', login);
userRouter.post('/confirm-shipper', protect, confirmShipperAdmin);
userRouter.post('/seeder', seederAdmin);

module.exports = {
    userRouter,
};

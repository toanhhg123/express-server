const asyncHandler = require('express-async-handler');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(req.body);
        if (!userName || !password) throw new Error('validate form');
        const userDb = await User.findOne({
            userName,
        });
        if (userDb) throw new Error('user early exits');
        const newUser = await User.create({
            userName,
            password,
        });
        return res.json('success');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(req.body);
        if (!userName || !password) throw new Error('validate form');
        const userDb = await User.findOne({
            userName,
            password,
        });
        if (!userDb) throw new Error('user login fail');
        var token = jwt.sign(
            {
                _id: userDb._id,
                userName: userDb.userName,
                password: userDb.password,
                who: userDb.who,
            },
            process.env.PRIVATEKEY
        );

        return res.json({ userDb, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const loginAdmin = asyncHandler(async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(req.body);
        if (!userName || !password) throw new Error('validate form');
        const userDb = await User.findOne({
            userName,
            password,
            who: 'admin',
        });
        if (!userDb) throw new Error('user login fail');
        var token = jwt.sign(
            {
                _id: userDb._id,
                userName: userDb.userName,
                password: userDb.password,
                who: userDb.who,
            },
            process.env.PRIVATEKEY
        );

        return res.json({ userDb, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const loginShipper = asyncHandler(async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) throw new Error('validate form');
        const userDb = await User.findOne({
            userName,
            password,
        });
        if (!userDb) throw new Error('user login fail');
        if (userDb.who === 'shipper' && !userDb.confirmShipper)
            throw new Error('awaiting admin submit');
        if (!userDb.confirmShipper) throw new Error('no shipper');
        var token = jwt.sign(
            {
                _id: userDb._id,
                userName: userDb.userName,
                password: userDb.password,
                who: userDb.who,
            },
            process.env.PRIVATEKEY
        );

        return res.json({ userDb, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const registerShipper = asyncHandler(async (req, res) => {
    try {
        const { userName, password, identityCard, avatar } = req.body;
        if (!userName || !password || !identityCard || !avatar)
            throw new Error('validate form');
        const userDb = await User.findOne({
            userName,
        });
        if (userDb) throw new Error('user early exits');
        const newUser = await User.create({
            userName,
            password,
            who: 'shipper',
            identityCard,
            avatar,
        });
        return res.json('success');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const confirmShipperAdmin = asyncHandler(async (req, res) => {
    try {
        const { _id, userName, password, who } = req.user;
        if (who !== 'admin') throw new Error('you not is admin');
        const { idShipper } = req.body;
        console.log(idShipper);

        if (!idShipper) throw new Error('id shipper is underfine');

        const shipper = await User.findById(idShipper);
        shipper.confirmShipper = true;
        await shipper.save();
        res.json('success');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const getShipperNoConfirm = asyncHandler(async (req, res) => {
    try {
        const { _id, userName, password, who } = req.user;
        if (who !== 'admin') throw new Error('you not is admin');

        const shipper = await User.find({
            who: 'shipper',
            confirmShipper: false,
        });
        res.json(shipper);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const seederAdmin = asyncHandler(async (req, res) => {
    try {
        await User.create({
            userName: 'admin',
            password: 'admin',
            who: 'admin',
        });

        return res.json('success');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = {
    loginAdmin,
    register,
    login,
    registerShipper,
    confirmShipperAdmin,
    seederAdmin,
    loginShipper,
    getShipperNoConfirm,
};

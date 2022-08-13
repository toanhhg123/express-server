const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const protect = asyncHandler(async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization?.startsWith('Bearer'))
            throw new Error('not found athencation');
        const token = authorization.split(' ')[1];
        if (!token) throw new Error('not token');

        const decode = jwt.verify(token, process.env.PRIVATEKEY);
        req.user = {
            _id: decode._id,
            userName: decode.userName,
            password: decode.password,
            who: decode.who,
        };
        return next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = {
    protect,
};

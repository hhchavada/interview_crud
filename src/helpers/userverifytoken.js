const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

exports.userVerifyToken = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const { userId } = jwt.verify(token, 'User');
        const user = await User.findById(userId);

        if (user) {
            req.user = user;
            next();
        } else {
            return res.status(401).json({ message: 'Invalid user token' });
        }
    } catch (error) {
        console.error('Error in userVerifyToken middleware:', error.message);
        res.status(500).json({ message: 'Internal Server Error from user Token' });
    }
};
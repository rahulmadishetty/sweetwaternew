const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes by verifying JWT
exports.protect = async (req, res, next) => {
    let token;

    // Check if the Authorization header contains a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract the token
            token = req.headers.authorization.split(' ')[1];
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Attach the user information to the request
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to restrict access to admin users only
exports.adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

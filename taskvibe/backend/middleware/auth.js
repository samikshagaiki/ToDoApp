const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Fixed: added space after Bearer
    if (!token) return res.status(401).json({message: 'No Token, authorization denied'});
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({message: 'Token is not valid'}); // Fixed: changed 402 to 401
    }
};
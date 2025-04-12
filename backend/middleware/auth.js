const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'no token' });

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token'});
    }
}

const isAdmin = (req, res, next) => {
    if(req.user.role !== 'admin'){
        return res.status(402).json({ message: 'Admin only' });
    }
    next();
};

module.exports = {auth, isAdmin};
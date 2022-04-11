const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            status: 401,
            error: "Invalid or expired token provided!",
            response: null
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}
const jwt = require('jsonwebtoken');
const jwtSecret = "jwt-secret-key";

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, jwtSecret, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("Access Denied. No Token Provided.");
    }
};

module.exports = authenticateJWT;

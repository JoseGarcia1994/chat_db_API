const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return next({
                status: 401,
                errorName: "No token",
                error: "No token present in headers"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: "HS512"
        });

        req.user = decoded;
        next();
    } catch (error) {
        next({
            status: 403,
            errorName: "Invalid token",
            error
        });
    }


};

module.exports = authenticate;
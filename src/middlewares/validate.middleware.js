const {validationResult} = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        next({
            status: 400,
            errorName: "Invalid or missing data",
            error: error.errors.map( (err) => err.msg)
        })
    }
}

module. exports = validateResult;
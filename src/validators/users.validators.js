const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

const loginUserValidator = [
    check("email", "Error with Email")
        .exists()
        .notEmpty()
        .withMessage("Email cannot not be empty")
        .isString()
        .withMessage("Is not a string")
        .isEmail()
        .withMessage("Invalid email format"),
    check("password", "Password is required")
        .exists()
        .notEmpty()
        .isString(),
    validateResult
];

const registerUserValidator = [
    check("username", "Username is used")
    .exists()
    .withMessage("username required")
    .notEmpty()
    .withMessage("username is empty")
    .isString()
    .withMessage("username is not a string")
    .isLength( {min: 6, max: 30 } )
    .withMessage("username does not meet requierments"),
    check("email", "Error with email")
    .exists()
    .withMessage("email required")
    .notEmpty()
    .withMessage("email is requiered")
    .isString()
    .withMessage("Email is not a string")
    .isEmail()
    .withMessage("Is not an email")
    .isLength( {min: 6, max: 50})
    .withMessage("Email does not meet requierments"),
    check("password", "Password is required")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password is empty")
    .isString()
    .withMessage("Password is not a string")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage("Password needs to have a minimum of 8 characters, 1 upercase, a number and special character"),
    validateResult
];

module.exports = {
    loginUserValidator,
    registerUserValidator,
}
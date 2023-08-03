const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

const createConversationValidator = [
    check("createdBy", "User does not exsist")
        .exists()
        .notEmpty()
        .withMessage("We need a user"),
    check("participants", "Participant does not exsist")
        .exists()
        .notEmpty()
        .withMessage("We need a participant"),
        validateResult
];

module.exports = {
    createConversationValidator,
}
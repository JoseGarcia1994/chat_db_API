const { check } = require('express-validator');
const validateResult = require('../middlewares/validate.middleware');

const messageCreatorValidator = [
    check("conversationId", "wrong user")
        .exists()
        .notEmpty()
        .withMessage("conversation cannot not be empty"),
    check("content", "Error with content")
        .exists()
        .notEmpty()
        .withMessage("content cannot not be empty"),
    check("senderId", "Incorect")
        .exists()
        .notEmpty()
        .withMessage("sender cannot not be empty"),
        validateResult
];

module.exports = {
    messageCreatorValidator,
}
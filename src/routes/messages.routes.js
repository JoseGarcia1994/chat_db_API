const {Router} = require('express');
const {createMessage} = require('../controllers/messages.controllers');
const authenticate = require('../middlewares/auth.middleware');
const {messageCreatorValidator} = require('../validators/messages.validators');

const router = Router();

router.post('/messages', authenticate, messageCreatorValidator, createMessage);

module.exports = router;
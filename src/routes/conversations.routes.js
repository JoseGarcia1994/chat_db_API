const { Router } = require('express');
const {createConversation, deleteConversation, getConversation, getUserConversations} = require('../controllers/conversations.controllers');
const authenticate = require('../middlewares/auth.middleware');
const { createConversationValidator } = require('../validators/conversations.validators');

const router = Router();

router.post('/conversations', authenticate, createConversationValidator, createConversation);

router.delete("/conversations/:id", authenticate, deleteConversation);

router.get('/conversations/:id', getConversation)

router.get('/user/conversations/:id', getUserConversations)

module.exports = router;
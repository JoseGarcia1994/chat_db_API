const {Messages} = require('../models');

const createMessage = async (req, res, next) => {
  try {
    const {conversationId, content, senderId} = req.body;

    const message = await Messages.create({
        conversationId,
        content,
        senderId,
    });
    res.json(message);
  } catch(error) {
     next(error)
  }
};

module.exports = {
    createMessage,
}
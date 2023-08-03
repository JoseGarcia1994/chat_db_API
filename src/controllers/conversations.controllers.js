const {Conversations, Participants, Messages} = require('../models');

const createConversation = async (req, res, next) => {
  try {
    // body: { createdBy: 2, participant: 4  }
    const { createdBy, participants, type } = req.body;
    // crear la conversacion 
    const conversation = await Conversations.create({createdBy});
    // conversation = { id, title, creattedBy, type, createdAt, updatedAt}
    // take the id of the created conversation and add the participants
    const { id } = conversation;
    // add the participants in the pivot table 
    /* await Participants.create({ userId: participant, conversationId: id }); */
    const participitantsArray = participants.map((participant) => ({
      userId: participant,
      conversationId: id,
    }));

    participitantsArray.push({ userId: createdBy, conversationId: id });
    await Participants.bulkCreate(participitantsArray)

    res.status(201).end();
  } catch(error) {
     next(error)
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;
    // before deleting the conversation
    // I delete all the records in participants that use that id
    await Conversations.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const {id} = req.params

    const conversation = await Conversations.findOne({
      where: {id},
      include: [
        {
          model: Participants
        },
        {
          model: Messages
        },
      ]
    });
    res.json(conversation);
  } catch(error) {
     next(error)
  }
}

const getUserConversations = async (req, res, next) => {
  try {
    const {id} = req.params

    const userConversation = await Conversations.findAll({
      where: {
        createdBy: id
      }
    })
    res.json(userConversation);
  } catch(error) {
     next(error)
  }
}

module.exports = {
  createConversation,
  deleteConversation,
  getConversation,
  getUserConversations,
};
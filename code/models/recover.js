const { Schema, model, Types } = require('mongoose')
const { nanoid } = require('nanoid');

const recoverSchema = new Schema({
  user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uuid: {
    type: String,
    default: () => nanoid(),
  },
  expiredAt: {
    type: Date,
    default: () => Date.now() + 60 * 10000 * 60,
  }
});

module.exports = model('recover', recoverSchema, 'oAuth')
const { Schema, model, Types } = require('mongoose')
const { nanoid } = require('nanoid');

const invitationSchema = new Schema({
  uuid:{
    type: String,
    default: nanoid,
  },
  user_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expiredAt: {
    type: Date,
    default: Date.now() + 10000 * 60 * 60,
  }
});

module.exports = model('Invitation', invitationSchema)
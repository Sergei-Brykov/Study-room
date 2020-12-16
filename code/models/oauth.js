const { Schema, model } = require('mongoose')

const oAuthSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  type: String,
  oauthId: String,
});
module.exports = model('oAuth', oAuthSchema, 'oAuth')
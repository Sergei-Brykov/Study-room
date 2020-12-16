// document.querySelector('video').playbackRate = 2

const Invitation = require('./models/invitations')
const Users = require('./models/users')
const Recover = require('./models/recover')
const oAuth = require('./models/oauth')
const mongoose = require('mongoose')
const configEnv = require('./config/config')

mongoose.connect(configEnv.MONGO_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(
  console.log('DB up!!!')
)



async function getBD(Shema) {
  const aray = await Shema.find({})
  console.log(`Model: `, aray)
}
async function killOne(id, Shema) {
  await Shema.findOneAndDelete(id)
}
async function killAll(Shema) {
  Shema.remove({}, () => {
    getBD(Shema)
  })
}




// killOne({_id: '5fc8eb4061383c4aee4b1b31'}, Invitation)
// killOne({email: 'sefddsfd@mail.ru'}, Users)

// killAll(Users)
// killAll(Recover)
// killAll(Invitation)
// killAll(oAuth)

getBD(Users)
// getBD(Invitation)
// getBD(Recover)
// getBD(oAuth)
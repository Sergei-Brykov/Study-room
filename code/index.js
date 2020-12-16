const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const sendError = require('./utils/sendError')
const apirourer = require('./routes/api.router')
const configEnv = require('./config/config')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

async function start() {
  app.use('/api', apirourer)
  app.use('/static', express.static(path.join(__dirname, 'client/build/static')))
  app.use('/favicon.ico', (req, res) => res.sendFile(path.resolve(__dirname, 'front', 'favicon.ico')))
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client/build', 'index.html')))
  app.use(sendError)
  try {
    await mongoose.connect(configEnv.MONGO_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    http.listen(configEnv.PORT, () => {
      console.log('server up')
    })
  } catch(e) {
    console.log(e)
    process.exit(1)
  }
}

io.on('connection', (socket) => {
  let store =''
  socket.on('msg', (msg) => {
    store += `${msg}\n` 
    console.log('message: ' + msg)
    socket.emit('update', store)
  })

 

  console.log('a user connected');
});

start()
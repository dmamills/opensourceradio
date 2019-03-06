const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');
const SERVER_PORT = 3000;
const { NodeMediaServer } = require('node-media-server');

var knex = require('knex')(require('./knexfile').development);

const mediaServerConfig = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};


const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

function getHistory() {
  return knex.select('name', 'message', knex.raw('created_at as timestamp'))
    .from('messages')
    .limit(100)
    .orderBy('created_at');
}

function saveMessage(message) {
  return knex('messages')
    .insert({
      name: message.name,
      created_at: message.timestamp,
      message: message.message
    });
}


app.get('/history', (req, res) => {
    getHistory()
    .then((history) => {
      res.json({
        history
      });
    }).catch(error => {
      res.status(500).json({
        error
      })
    })
})

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('message', msg => {
    console.log('server got message', msg);
    saveMessage(msg)
      .then(result => {
        console.log('save successful, sending message');
        io.emit('message', msg);
      }).catch(err => {
        socket.emit('message-error', err);
      });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
});

server.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});

const nms = new NodeMediaServer(mediaServerConfig)
nms.run();

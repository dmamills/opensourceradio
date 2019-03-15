const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const { NodeMediaServer } = require('node-media-server');

const SERVER_PORT = 3000;
const { getHistory, getPlaylist, saveMessage } = require('./util');

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

app.use(morgan('dev'));
app.use(cors());

app.get('/history', (req, res) => {
    getHistory()
    .then((history) => {
      res.json({
        history
      });
    }).catch(error => {
      res.status(500).json({
        error
      });
    });
})

app.get('/playlist', (req, res) => {
  getPlaylist()
    .then(playlist => {
      res.json({
        playlist
      });
    }).catch(error => {
      res.status(500).json({
        error
      });
    });
});

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

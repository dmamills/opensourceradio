require('dotenv').config();
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { NodeMediaServer } = require('node-media-server');
const mediaServerConfig = require('./mediaServerConfig');
const api = require('./routes/api');
const { MessageRepository } = require('./repo');

const { SERVER_PORT } = process.env;

const server = http.createServer(app);
const io = socketio(server, { path: '/api'});

app.disable('etag');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use('/', api);

const connectedUsers = {};

function emitUsers(key) {
  const users = Object.keys(connectedUsers);
  io.emit(key, { users });
}

io.on('connection', function(socket) {
  let socketName = null;

  socket.on('name-set', ({ name }) => {
    if(connectedUsers[name]) {
      socket.emit('name-used', { error: 'name already set'});
      return;
    }

    socketName = name;
    socket.emit('name-accepted', { name });

    connectedUsers[name] = true;
    emitUsers('user-joined');
  });

  socket.on('name-unset', () => {
    delete connectedUsers[socketName];
    emitUsers('user-left');
  });

  socket.on('message', msg => {
    if(msg.name)
      MessageRepository.create(msg)
        .then(result => {
          io.emit('message', msg);
        }).catch(err => {
          socket.emit('message-error', err);
        });
  });

  socket.on('disconnect', () => {
    delete connectedUsers[socketName];
    emitUsers('user-left');
  });
});

server.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});

const nms = new NodeMediaServer(mediaServerConfig);
nms.run();

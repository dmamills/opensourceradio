# opensourceradio server

The server is responsible for managing the API routes of the client and server application. It also runs the rtmp-server, the websocket chat server, as well as manages the osr_stream process.

## packages used

- [expressjs](https://expressjs.com/), used for basic api
- [knex](https://knexjs.org/), used communicating with sqlite database
- [socket.io](https://socket.io/), used to manage websocket chat system
- [node-media-server](https://github.com/illuspas/Node-Media-Server), runs the rtmp-server for streaming media
- [pm2](https://pm2.keymetrics.io/), used to manage the osr_stream process which broadcasts to the rtmp server
- [joi](https://github.com/hapijs/joi), basic validation package

## client api

- `/api/schedules/today` fetches daily schedules
- `/api/history` returns the last 50 chat messages sent, called when the app starts up.

## server api

TODO

## rtmp-server

A basic usage case of the [`node-media-server` package](https://github.com/illuspas/Node-Media-Server). It's can be configured by modifying the values in `mediaServerConfig.js`.

It is responsible for the broadcasting stream, which gets published from the osr_stream. It exposes an endpoint that can be consumed by the client app via flv.js.

## web sockets

The websocket chat system is very basic. It responds to a small set of events:

- `message`, called when a user sends a message, stores it in sqlite and emits to all users. 
- `name-set`, called when a used attempts to set their username, will respond with either `name-accepted` or `name-used`. will emit `user-joined` to all users if name accepted.
- `name-unset`, called when a user revokes thier username, emits `user-left` to all users.
- `disconnect`, called when socket connection closed, emits `user-left` to all users.

## osr_stream process


# opensourceradio

a proof of concept for self hosting streaming radio.

## example 

![example stream](example.png)

## usage

### stream

to start radio stream, populate `stream/audio` directory with mp3 files. then run:

```
npm install -g live-stream-radio
live-stream-radio stream
```

### backend 

```
cd server
npm install
node index.js
```

### client

```
cd client
npm install
npm start
```

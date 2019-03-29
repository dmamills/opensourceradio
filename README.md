# opensourceradio

a proof of concept for self hosting streaming radio. [come and check it out](http://radio.yomills.com)

## example 

![example stream](example.png)

## usage

### stream

to start radio stream, populate `stream/audio` directory with mp3 files. then run:

```
cd stream2
npm install
node index.js
```

### backend 

```
cd server
npm install
./node_modules/.bin/knex migrate:latest
node index.js
```

### client

```
cd client
npm install
npm start
```

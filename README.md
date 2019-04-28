# opensourceradio

a proof of concept for self hosting streaming radio.

[come and check it out!](http://radio.yomills.com)

## example

![example stream](example.png)

## usage

### setup

#### ffmpeg

before anything else, you'll need FFMPEG locally. if you don't already, run `brew install ffmpeg` to install it locally.

you may run into a somewhat-common issue of the install failing when building symlinks, which is [fixed in this GitHub thread](https://github.com/Homebrew/homebrew-core/issues/30652#issuecomment-410645836).

#### env files

in the client, server, and stream directories, you'll find `.env.example` files. create a new `.env` file for each directory and copy the content of the `.env.example`.

#### audio files

to populate your radio stream, `mkdir stream/assets/audio` and fill the directory with mp3 files of your choosing.

### backend

```
cd server
npm install
./node_modules/.bin/knex migrate:latest
node index.js
```

### stream

```
cd stream
npm install
node index.js
```

### client

```
cd client
npm install
npm start
```

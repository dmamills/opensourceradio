# radio-stream

self hosted radio management package

## features

- ffmpeg -> rtmp stream
- playlist
- scheduling

schedule:
  - start time: date time
  - length: n hours
  - playlist: json?

app state:
  - last song played
  - current schedule

format:
  - while running
    - start process
      - load config
      - load "app state"
      - get current time
      - if current time > start_time + n hours
        - change playlist
          if !next scheduled playlist
            randomly pick from all audio
      - else
        - get next song in playlist
          if lastsong index + 1 > playlist.length
            song = 0
    
      FFMPEG PROCESS
      - get bg video sample
      - get get next song path
      - load song metadata
      - create ffmpeg process
        - on done
          - update + save app state
        - on error
            update + save app state

   

### basic ffmpeg stream:

ffmpeg -stream_loop -1 -i /Users/mills/projects/radio/stream/video/The-Slow-Dock.mp4 -i '/Users/mills/projects/radio/stream/audio/The Revibe ft. Sasuke (Prod. by Bugseed)-130305103.wav' -s 1280x720 -b:v 2500k -b:a 128k -ar 44100 -acodec aac -vcodec libx264 -preset superfast -bufsize 2500k -crf 28 -threads 2 -f flv rtmp://localhost/live/opensourceradio

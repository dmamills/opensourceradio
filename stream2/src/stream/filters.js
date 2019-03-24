let config = require('../../config.json');

const addFilters = metadata => {

   // Start creating our complex filter for overlaying things
   let complexFilterString = '';

   // Add silence in front of song to prevent / help with stream cutoff
   // Since audio is streo, we have two channels
   // https://ffmpeg.org/ffmpeg-filters.html#adelay
   // In milliseconds
   const delayInMilli = 3000;
   complexFilterString += `[1:a] adelay=${delayInMilli}|${delayInMilli} [delayedaudio]; `;
 
   // Mix our silent and song audio, se we always have an audio stream
   // https://ffmpeg.org/ffmpeg-filters.html#amix
   complexFilterString += `[delayedaudio][2:a] amix=inputs=2:duration=first:dropout_transition=3 [audiooutput]; `;
 
   // Check if we want normalized audio
   if (config.normalize_audio) {
     // Use the loudnorm filter
     // http://ffmpeg.org/ffmpeg-filters.html#loudnorm
     complexFilterString += `[audiooutput] loudnorm [audiooutput]; `;
   }
 
   // Okay this some weirdness. Involving fps.
   // So since we are realtime encoding to get the video to stream
   // At an apporpriate rate, this means that we encode a certain number of frames to match this
   // Now, let's say we have a 60fps input video, and want to output 24 fps. This is fine and work
   // FFMPEG will output at ~24 fps (little more or less), and video will run at correct rate.
   // But if you noticed the output "Current FPS" will slowly degrade to either the input
   // our output fps. Therefore if we had an input video at lest say 8 fps, it will slowly
   // Degrade to 8 fps, and then we start buffering. Thus we need to use a filter to force
   // The input video to be converted to the output fps to get the correct speed at which frames are rendered
   let configFps = '24';
   if (config.video_fps) {
     configFps = config.video_fps;
   }
   complexFilterString += `[0:v] fps=fps=${configFps}`;
 
   /*
   // Add our overlayText
   const overlayTextFilterString = await getOverlayTextString(path, config, typeKey, metadata);
   if (overlayTextFilterString) {
     if (complexFilterString.length > 0) {
       complexFilterString += `, `;
     }
     complexFilterString += `${overlayTextFilterString}`;
   }
 
  */
   // Set our final output video pad
 //complexFilterString += ` [videooutput]`;

 return complexFilterString;
}

module.exports = addFilters;
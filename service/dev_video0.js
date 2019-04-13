const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg()
  .input('/dev/video0')
  .size('640x480')
  .videoCodec('libx264')
  .videoBitrate('700k')
  .audioCodec('libopus')
  .audioBitrate(96)
  .outputOptions([
    '-hls_list_size 3',
    '-hls_time 2',
    '-hls_base_url tmp/',
    '-hls_segment_filename tmp/%03d.ts',
    '-hls_flags delete_segments'
  ])
  .output('./tmp/playlist.m3u8')
  .on('error', function(err, stdout, stderr) {
    console.log('an error happened: ' + err.message, stderr);
  })
  .run();

const fs = require('fs');
const express = require('express');

const app = express();

app.get('/api/v1/tmp/:id', (req, res) => {
  const stream = fs.createReadStream('./tmp/' + req.params.id);
  res.writeHead(200, {
    'Content-Type': 'video/mp2t',
    'Access-Control-Allow-Origin': '*'
  });
  stream.pipe(res);
});

app.get('/api/v1/stream', (req, res) => {
  const stream = fs.createReadStream('./playlist.m3u8');
  res.writeHead(200, {
    'Content-Type': 'application/vnd.apple.mpegurl',
    'Access-Control-Allow-Origin': '*'
  });
  stream.pipe(res);
});

app.get('*', (req, res) => {
  const stream = fs.createReadStream('./service/index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  stream.pipe(res);
});

app.listen(3330, () => {
  console.log('server 3330')
})

const fs = require('fs');
const express = require('express');

const app = express();

const notFound = (res) => (err) => res.setStatus(404).send(JSON.stringify(err, null, 2));

const contentType = (res, ct) => {
  res.writeHead(200, {
    'Content-Type': ct,
    'Access-Control-Allow-Origin': '*'
  });
}

app.get('/api/v1/tmp/:id', (req, res) => {
  const stream = fs.createReadStream('./tmp/' + req.params.id);
  contentType(res, 'video/mp2t');
  stream.on('error', notFound(res));
  stream.pipe(res);
});

app.get('/api/v1/live.m3u8', (req, res) => {
  const stream = fs.createReadStream('./tmp/playlist.m3u8');
  contentType(res, 'application/vnd.apple.mpegurl');
  stream.on('error', notFound(res));
  stream.pipe(res);
});

app.get('*', (req, res) => {
  const stream = fs.createReadStream('./service/index.html');
  contentType(res, 'text/html');
  stream.on('error', notFound(res));
  stream.pipe(res);
});

app.listen(3330, () => {
  console.log('server 3330')
})

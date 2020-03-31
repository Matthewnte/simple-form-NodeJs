const http = require('http');
const fs = require('fs');
const { parse } = require('querystring')

const server = http.createServer((req, res) => {
  fs.readFile('form.html', (err, data) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            res.end(result.message);
        });
    } else {
      res.end(data);
    }
  })
})

server.listen(8080);

function collectRequestData(req, cb) {
  const FORM_URLENCODED = 'application/x-www-form-urlencoded';
  if (req.headers['content-type'] === FORM_URLENCODED) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      cb(parse(body));
    });
  } else {
    cb(null);
  }
}
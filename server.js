const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('form.html', (err, data) => {
    if(req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      })
      req.on('end', () => {
        console.log(body);
        res.end('ok');
      })
    } else {
      res.end(data);
    }
  })
})

server.listen(8080);
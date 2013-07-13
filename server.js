var http = require('http')
  , os   = require('os')
  , hostname = os.hostname()
  , port = 3000;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from ' + hostname + '\n');
}).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');
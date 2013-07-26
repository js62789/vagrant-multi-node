var http = require('http')
  , express = require('express')
  , socket = require('socket.io')
  , os   = require('os')
  , app = module.exports = express()
  , server = http.createServer(app)
  , io = socket.listen(server)
  , hostname = os.hostname()
  , port = 3000;

app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  res.render('index', {"hostname": hostname});
});

app.get('/blog', function (req, res) {
  res.render('blog', {"hostname": hostname});
});

app.get('/admin', function (req, res) {
  res.render('admin');
});

app.get('/admin/articles', function (req, res) {
  res.render('admin_articles');
});

server.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
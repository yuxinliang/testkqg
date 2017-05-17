// var http = require('http');
// var port = process.env.port || 1337;
// http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//     res.end('Hello Worldaaa\n');
// }).listen(port);
// console.log("Server Started! Please visit http://127.0.0.1:" + port);

// //提交一个名称，生成一个模块
// http.createServer(function (req,res){
//     console.log("hahaha")
// })

var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    server;

server = http.createServer(function (req, res) {
    // your normal server code
    var path = url.parse(req.url).pathname;
    console.log(path);
    switch (path) {
        case '/':
            res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Hello! Try the <a href="/index.html">Socket.io Test</a></h1>');
            res.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function (err, data) {
                if (err) {
                    return send404(res);
                }
                res.writeHead(200, { 'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html' })
                res.write(data, 'utf8');
                res.end();
            });
            break;
        default: send404(res);
    }
});
function send404 (res) {
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8080);

var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log("Connection " + socket.id + " accepted.");
    socket.on('message', function (message) {
        console.log("Received message: " + message + " - from client " + socket.id);
    });
    socket.on('disconnect', function () {
        console.log("Connection " + socket.id + " terminated.");
    });
});
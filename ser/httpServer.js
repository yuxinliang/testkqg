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
            res.write('<h1>Hello! Try the <a href="/index.html">主页</a></h1>');
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
function send404(res) {
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8080);

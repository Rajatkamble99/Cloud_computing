var http = require('http');
var url = require('url');

function parsetime(time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  };
}

function unixtime(time) {
  return { unixtime: time.getTime() };
}

// New function to handle '/api/currenttime' requests
function currenttime() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: String(now.getMonth() + 1).padStart(2, '0'), // Month is zero-indexed
    date: String(now.getDate()).padStart(2, '0'),
    hour: String(now.getHours()).padStart(2, '0'),
    minute: String(now.getMinutes()).padStart(2, '0')
  };
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true);
  var time = new Date(parsedUrl.query.iso);
  var result;

  if (/^\/api\/parsetime/.test(req.url)) {
    result = parsetime(time);
  } else if (/^\/api\/unixtime/.test(req.url)) {
    result = unixtime(time);
  } else if (/^\/api\/currenttime/.test(req.url)) {
    result = currenttime(); // Handle the '/api/currenttime' request
  }

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(Number(process.argv[2]));


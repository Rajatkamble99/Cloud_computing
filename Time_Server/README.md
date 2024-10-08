# Node.js Time Server on Ubuntu

## Table of Contents
Introduction
- Setup the Environment
- Download Programs and Documentation
- Process of Program Execution
- Screenshot of Execution Results
- Conclusion

# Introduction
This project involves setting up a simple time server using Node.js on an Ubuntu machine. The server returns the current date and time when accessed through a specific port.

# Setup the Environment
1.Install Ubuntu: Set up an Ubuntu virtual machine or use an existing Ubuntu server.
2.Verify Ubuntu Version:

```bash
# lsb_release -a

```
Ensure the server is running a compatible version (e.g., Ubuntu 18.04, 20.04, or 22.04).

3.Enable NodeSource Repository
```bash
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

```
4. Install Node.js and npm
```bash
sudo apt-get update
sudo apt-get install -y nodejs
```
5. Verify Installation:
```bash
node --version
npm --version

```

# Download Programs and Documentation

Download the time_server.js file: Create a file named time_server.js and add the following code:
```javascript
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

```

# Process of Program Execution
1. Run the Time Server: Open a terminal and navigate to the directory where time_server.js is saved. Run the following command:

```bash
node time_server.js 8000

```
This will start the server on port 8000.

2. Access the Time Server: Open a web browser or use curl to access the server:

-Browser: Go to http://localhost:8000
-Using curl

```bash
curl http://localhost:8000
```
The server will return the current date and time in the format YYYY-MM-DD HH:MM.

# Screenshot of Execution Results

![ssss](https://github.com/user-attachments/assets/4f1c4f35-64fb-4d71-b966-dabfb0ca0418)

# Conclusion

This project demonstrates how to set up a simple Node.js-based time server on Ubuntu. It covers the environment setup, code execution, and accessing the server to retrieve the current date and time. This server can be further extended for more complex time-related functionalities.










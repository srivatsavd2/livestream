const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

// Initialize the Express application
const app = express();

// Create an HTTP server and bind it to the Express app
const server = http.Server(app);
const io = socketIO(server);

// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to serve the main HTML file
app.get("/stream", (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

// Start the server and bind it to all network interfaces (0.0.0.0)
server.listen(port, '0.0.0.0', () => {
    console.log(`Server started: 0.0.0.0:${port}`);
});

// Load additional routes and socket events
require("./src/Route/route")(app);
require("./src/Socket/socketEvent")(io);
require("./src/Socket/socketFunction").init(io);

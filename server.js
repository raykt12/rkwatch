const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname)); // Serve static files

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('videoLoaded', (url) => {
        socket.broadcast.emit('videoLoaded', url);
    });

    socket.on('videoPlayed', (time) => {
        socket.broadcast.emit('videoPlayed', time);
    });

    socket.on('videoPaused', (time) => {
        socket.broadcast.emit('videoPaused', time);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

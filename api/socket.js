const { Server } = require("socket.io");

module.exports = (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const io = new Server(res.socket.server);
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

    if (!res.socket.server.io) {
        res.socket.server.io = io;
    }

    res.end();
};

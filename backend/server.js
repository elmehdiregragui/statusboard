const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// liste des utilisateurs
const members = []; // { id, name, status, time }

const getTime = () => {
    const date = new Date();
    return date.getHours().toString().padStart(2, '0') + ':' +
           date.getMinutes().toString().padStart(2, '0');
};

io.on('connection', (socket) => {

    // utilisateur rejoint
    socket.on('user:join', ({ name }) => {
        const member = {
            id: socket.id,
            name,
            status: 'En ligne',
            time: getTime()
        };

        members.push(member);
        io.emit('members:update', members);
    });

    // changement de statut
    socket.on('status:change', ({ status }) => {
        const user = members.find(m => m.id === socket.id);

        if (user) {
            user.status = status;
            user.time = getTime();
        }

        io.emit('members:update', members);
    });

    // déconnexion
    socket.on('disconnect', () => {
        const index = members.findIndex(m => m.id === socket.id);

        if (index !== -1) {
            members.splice(index, 1);
        }

        io.emit('members:update', members);
    });

});

server.listen(3001, () => console.log('Server listening on port 3001'));
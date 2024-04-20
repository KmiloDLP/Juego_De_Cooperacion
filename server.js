const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, '.')));

function createRandomRoomUUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

let rooms = {};

io.on('connection', (socket) => {
    socket.on('createRoom', (room, callback) => {
        if (!rooms[room]) {
            rooms[room] = { name: room, uuid: createRandomRoomUUID(), players: [], turn: 0 };
            socket.join(room);
            rooms[room].players.push({
                id: socket.id,
                points: 0,
                values: []
            });
        }
        callback(rooms[room]);
    });

    socket.on('joinRoom', (uuid, callback) => {
        const room = Object.values(rooms).find(room => room.uuid === uuid);
        if (room && room.players.length < 2) {
            socket.join(room.name);
            room.turn = 1;
            room.players.push({
                id: socket.id,
                points: 0,
                values: []
            });
            callback(room);
            io.to(room.name).emit('startGame');
        }
    });

    socket.on('handleTurn', (uuid, value) => {
        const room = Object.values(rooms).find(room => room.uuid === uuid);
        if (room.turn === 10) {
            io.to(room.name).emit('gameOver', room.players);
            return;
        }

        let playerIndex = room.players.findIndex(player => player.id === socket.id);
        room.players[playerIndex].values.push(value);

        if (room.players[0].values.length === room.players[1].values.length) {

            let player1Value = room.players[0].values[room.players[0].values.length - 1];
            let player2Value = room.players[1].values[room.players[1].values.length - 1];

            if (player1Value === player2Value) {
                room.players[0].points += 3;
                room.players[1].points += 3;
            } else if (player1Value !== player2Value && player1Value === false) {
                room.players[0].points += 5;
            } else if (player1Value !== player2Value && player2Value === false) {
                room.players[1].points += 5;
            } else {
                room.players[0].points += 1;
                room.players[1].points += 1;
            }

            room.turn++;
            
            io.to(room.name).emit('nextTurn');
        }
    });

    socket.on('disconnect', () => {
        for (let room in rooms) {
            let playerIndex = rooms[room].players.indexOf(socket.id);
            if (playerIndex !== -1) {
                rooms[room].players.splice(playerIndex, 1);
                rooms[room].turn = 0;
                if (rooms[room].players.length === 0) {
                    delete rooms[room];
                } else {
                    io.to(room).emit('playerLeft');
                }
            }
        }
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});
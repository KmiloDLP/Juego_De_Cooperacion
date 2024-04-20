

const socket = io('http://192.168.31.204:3001/');
let roomIdentifier = '';

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('startGame', () => {
    console.log('Game started');
    console.log('Sending first turn', roomIdentifier)
    const handleTurn = async () => {
        await new Promise(resolve => {
            const interval = setInterval(() => {
                if (roomIdentifier) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000);
        });
        socket.emit('handleTurn', roomIdentifier, botLogic());
    };

    handleTurn();
});

socket.on('nextTurn', () => {
    console.log('Next turn');
    socket.emit('handleTurn', roomIdentifier, botLogic());
});

socket.on('gameOver', (players) => {
    console.log('Game over', players);
});

document.getElementById('createRoom').addEventListener('click', () => {
    console.log('Creating room')
    let roomName = document.getElementById('roomName').value;
    socket.emit('createRoom', roomName, (room) => {
        console.log('Room created', room);
        roomIdentifier = room.uuid;
    });
});

document.getElementById('joinRoom').addEventListener('click', () => {
    console.log('Joining room')
    let roomUUID = document.getElementById('roomUUID').value;
    socket.emit('joinRoom', roomUUID, (room) => {
        console.log('Room joined', room);
        roomIdentifier = room.uuid;
    });
});

function botLogic() {
    return Math.random() >= 0.5;
}


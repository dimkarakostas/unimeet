const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9871]', 9871)
    .parse(process.argv);


const io = require('socket.io'),
      winston = require('winston');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'label': 'realtime'});

const PORT = program.port;

winston.info('Unichat realtime service');
winston.info('Listening on port ' + PORT);

const socketIOServer = io.listen(PORT);

function getRoomUsercount(room) {
    return socketIOServer.sockets.adapter.rooms[room].length;
}

var matchmaker = '';
socketIOServer.on('connection', (client) => {
    winston.debug('New connection from client ' + client.id);

    // Matchmaker communication
    client.on('register-matchmaker', () => {
        matchmaker = client.id;
        winston.debug('Matchmaker service connected with id ' + client.id);
    });

    // Frontend communication
    client.on('client-join-room', (roomId, cookieId) => {
        winston.debug('Client ' + client.id + ' with cookie (' + cookieId + ') joins room ' + roomId);
        client._chatRoom = roomId;
        client.join(client._chatRoom);
        if (socketIOServer.sockets.adapter.rooms[client._chatRoom].length > 1) {
            socketIOServer.in(client._chatRoom).emit('server-start-chatting');
        }
    });

    client.on('client-next', () => {
        winston.debug('Client ' + client.id + ' leaves room ' + client._chatRoom);
        client.leave(client._chatRoom);
        client.broadcast.to(client._chatRoom).emit('server-next');
    });

    client.on('client-message', (message) => {
        winston.debug('Client ' + client.id + ' sent to room ' + client._chatRoom + ' the message: ' + message);
        client.broadcast.to(client._chatRoom).emit('server-message', message, 'partner');
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
        // If a user disconnects by closing the browser and its partner is still in the room,
        // notify it to search for a new one
        let room = socketIOServer.sockets.adapter.rooms[client._chatRoom];
        if (room !== undefined && getRoomUsercount(client._chatRoom) == 1) {
            socketIOServer.in(client._chatRoom).emit('server-next');
        }
    });
});

const program = require('commander');

program
    .version('0.0.1')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9871]', 9871)
    .parse(process.argv);


const io = require('socket.io'),
      winston = require('winston');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true});

const PORT = program.port;

winston.info('Unichat realtime service');
winston.info('Listening on port ' + PORT);

const socket = io.listen(PORT);

socket.on('connection', (client) => {
    let _chatRoom = '';
    winston.debug('New connection from client ' + client.id);

    client.on('client-join-room', (roomId) => {
        // join-room is received after connection has been established with successful client-hello/server-hello messages
        winston.debug('Client ' + client.id + ' wishes to join room ' + roomId);
        client.join(roomId);
        _chatRoom = roomId;
        winston.debug('Client\'s room: ' + _chatRoom);
        client.emit('server-join-room');
    });

    client.on('client-next', () => {
        winston.debug('Client ' + client.id + ' wished to leave room ' + _chatRoom);
        client.leave(_chatRoom);
        client.broadcast.to(_chatRoom).emit('server-next');
    });

    client.on('client-message', (message) => {
        winston.debug('Client ' + client.id + ' sent to room ' + _chatRoom + ' the message: ' + message);
        client.broadcast.to(_chatRoom).emit('server-message', message, 'partner');
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
        winston.debug('Notifying room ' + _chatRoom + ' for the disconnection');
        client.broadcast.to(_chatRoom).emit('message', 'Your partner ' + client.id + ' has left.');
    });
});

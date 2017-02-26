const program = require('commander');

program
    .version('0.0.1')
    .option('-p, --port <port>', 'specify the websocket port to listen to [3031]', 3031)
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
    let _rooms = [];
    winston.debug('New connection from client ' + client.id);

    client.on('client-hello', (data) => {
        winston.debug('Client ' + client.id + ' sent client-hello.');
        client.emit('server-hello', client.id);
    });

    client.on('join-room', (data) => {
        // join-room is received after connection has been established with successful client-hello/server-hello messages
        let roomId;

        try {
            ({roomId} = data);
        }
        catch (e) {
            winston.error('Got invalid join-room message (data: ' + data + ') from client ' + client.id);
            return;
        }
        winston.debug('Client ' + client.id + ' wishes to join room ' + roomId);
        client.join(roomId);
        _rooms.push(roomId);
        winston.debug('Client\'s rooms: ' + _rooms);
    });

    client.on('client-leave-room', (data) => {
        // client-leave-room is received either because the client wants to leave the room
        // or because the server notified it that it is the last one after a conversation
        let roomId;

        try {
            ({roomId} = data);
        }
        catch (e) {
            winston.error('Got invalid client-leave-room message (data: ' + data + ') from client ' + client.id);
            return;
        }
        winston.debug('Client ' + client.id + ' wished to leave room ' + roomId);
        client.leave(roomId);
        socket.in(roomId).emit('message', 'Your partner ' + client.id + ' has left.');
    });

    client.on('send', (data) => {
        let roomId, message;

        try {
            ({roomId, message} = data);
        }
        catch (e) {
            winston.error('Got invalid client-leave-room message (data: ' + data + ') from client ' + client.id);
            return;
        }
        winston.debug('Client ' + client.id + ' sent to room ' + roomId + ' the message: ' + message);
        socket.in(roomId).emit('message', message);
    });
});

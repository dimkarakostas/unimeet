const program = require('commander'),
      io = require('socket.io'),
      winston = require('winston'),
      axios = require('axios'),
      serviceConfig = require('../config/services.json');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9871]', 9871)
    .parse(process.argv);

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'label': 'realtime'});

const PORT = program.port;
const AUTH_TOKEN = serviceConfig.realtime.auth;

winston.info('Unimeet realtime service');
winston.info('Listening on port ' + PORT);

const socketIOServer = io.listen(PORT);

function getRoomUsercount(room) {
    return socketIOServer.sockets.adapter.rooms[room].length;
}

function backendStats(activeClients) {
    axios.post(serviceConfig.backend.url + '/service_stats', {
        name: 'realtime',
        token: AUTH_TOKEN,
        activeUsers: activeClients
    })
    .then(res => {
        winston.debug("Updated backend stats, new active users: " + activeClients.toString());
    })
    .catch(error => {
        winston.error(error);
    })
}

var matchmaker = '';
var activeClients = -1;  // Matchmaker counts as a connection, so starting from -1 depicts only frontend clients
socketIOServer.on('connection', (client) => {
    winston.debug('New connection from client ' + client.id);
    activeClients += 1;
    backendStats(activeClients);

    // Matchmaker communication
    client.on('register-matchmaker', () => {
        matchmaker = client.id;
        winston.debug('Matchmaker service connected with id ' + client.id);
    });

    // Frontend communication
    client.on('client-join-room', (roomId, token) => {
        winston.debug('Client ' + client.id + ' with token (' + token + ') joins room ' + roomId);
        client._chatRoom = roomId;
        client.join(client._chatRoom);
        if (getRoomUsercount(client._chatRoom) > 1) {
            socketIOServer.in(client._chatRoom).emit('server-start-chatting');
        }
        else {
            // If partner doesn't join room within 30secs something went wrong,
            // so try finding a new one
            setTimeout(() => {
                // Conversation could have started and then either changed partner,
                // so room might not exist although client does
                room = socketIOServer.sockets.adapter.rooms[client._chatRoom];
                if (room !== undefined && getRoomUsercount(client._chatRoom) === 1) {
                    socketIOServer.in(client._chatRoom).emit('server-next');
                }
            }, 30000);
        }
    });

    client.on('client-next', () => {
        winston.debug('Client ' + client.id + ' leaves room ' + client._chatRoom);
        client.leave(client._chatRoom);
        client.broadcast.to(client._chatRoom).emit('server-next');
    });

    client.on('client-message', (message) => {
        client.broadcast.to(client._chatRoom).emit('server-message', message, 'partner');
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
        activeClients -= 1;
        backendStats(activeClients);
        // If a user disconnects by closing the browser and its partner is still in the room,
        // notify it to search for a new one
        let room = socketIOServer.sockets.adapter.rooms[client._chatRoom];
        if (room !== undefined && getRoomUsercount(client._chatRoom) == 1) {
            socketIOServer.in(client._chatRoom).emit('server-next');
        }
    });
});

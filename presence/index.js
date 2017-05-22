const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9870]', 9870)
    .parse(process.argv);


const io = require('socket.io'),
      winston = require('winston');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'label': 'presence'});

const PORT = program.port;

winston.info('Unichat presence service');
winston.info('Listening on port ' + PORT);

const socketIOServer = io.listen(PORT);

var cookieClients = {};
var matchmaker = null;
var waitingClients = [];
socketIOServer.on('connection', (client) => {
    winston.debug('New connection from client ' + client.id);

    // Matchmaker communication
    client.on('register-matchmaker', () => {
        matchmaker = client.id;
        winston.debug('Matchmaker service connected with id ' + client.id);
        for (var i=0; i < waitingClients.length; i++) {
            socketIOServer.to(matchmaker).emit('presence-find-partner', waitingClients[i]);
        }
    });

    client.on('matchmaker-send-to-room', (cookieId, realtimeUrl, roomId) => {
        // Verify if the message actually came from the matchmaker client
        if (client.id === matchmaker) {
            let frontendClient = cookieClients[cookieId];
            socketIOServer.to(frontendClient).emit('server-join-room', realtimeUrl, roomId);
            winston.debug('Sending client ' + frontendClient + ' to realtime (' + realtimeUrl + ') in room ' + roomId);
        }
    });

    // Frontend communication
    client.on('client-get-partner', (cookieId) => {
        client._cookieId = cookieId;
        cookieClients[cookieId] = client.id;
        winston.debug('Client ' + client.id + ' with cookie (' + client._cookieId + ') wants partner.');
        if (matchmaker === null) {
            waitingClients.push(client._cookieId);
        }
        else {
            socketIOServer.to(matchmaker).emit('presence-find-partner', client._cookieId);
        }
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
        var waitingIndex = waitingClients.indexOf(client._cookieId);
        if (waitingIndex > -1) {
            waitingClients.splice(waitingIndex, 1);
        }
    });
});

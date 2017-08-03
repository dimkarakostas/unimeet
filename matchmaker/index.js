const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9872]', 9872)
    .parse(process.argv);


const io = require('socket.io-client'),
      winston = require('winston'),
      config = require('./config.js');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'label': 'matchmaker'});

const PORT = program.port;
const SERVICES = config.services;

winston.info('Unimeet matchmaker service');
winston.info('Listening on port ' + PORT);

let serviceSockets = [];
let presenceToUse = '';
let realtimeToUse = '';
let waitingClient = null;
for (var i=0; i < SERVICES.length; i++) {
    let _url = SERVICES[i].url;
    let _type = SERVICES[i].type;

    let _socketIOServer = io.connect(_url, {'forceNew': true});

    _socketIOServer.on('connect', () => {
        winston.debug('Connected to ' + _type + ' service at ' + _url);
        _socketIOServer.emit('register-matchmaker');
    });

    _socketIOServer.on('presence-find-partner', (token) => {
        winston.debug('Finding partner for client with token: ' + token);
        if (waitingClient === null) {
            waitingClient = {'token': token, 'presenceSocket': _socketIOServer};
        }
        else {
            let client1 = waitingClient;
            let client2 = {'token': token, 'presenceSocket': _socketIOServer};
            let roomId = Math.random().toString(36).substr(2, 35);

            _socketIOServer.emit('matchmaker-send-to-room', client1.token, realtimeToUse.url, roomId, client2.token);
            winston.debug('Sent client with token (' + client1.token + ') to room: ' + roomId);
            waitingClient.presenceSocket.emit('matchmaker-send-to-room', client2.token, realtimeToUse.url, roomId, client1.token);
            winston.debug('Sent client with token (' + client2.token + ') to room: ' + roomId);

            waitingClient = null;
        }
    });

    _socketIOServer.on('presence-client-disconnected', (token) => {
        if (waitingClient !== null) {
            winston.debug('Removing from wait line client: ' + token);
            waitingClient = null;
        }
    });

    serviceSockets.push(_socketIOServer);

    // Define the primary presence/realtime service that traffic is directed at
    if (_type == 'presence') {
        presenceToUse = {'socketIOServer': _socketIOServer, 'url': _url};
        winston.debug('Presence to use: ' + presenceToUse.url);
    }
    else {
        realtimeToUse = {'socketIOServer': _socketIOServer, 'url': _url};
        winston.debug('Realtime to use: ' + realtimeToUse.url);
    }
}

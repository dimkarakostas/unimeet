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

const ROOMID = 'room1';

winston.info('Unichat matchmaker service');
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

    _socketIOServer.on('presence-find-partner', (cookieId) => {
        winston.debug('Finding partner for client with cookie: ' + cookieId);
        if (waitingClient === null) {
            waitingClient = {'cookie': cookieId, 'presenceSocket': _socketIOServer};
        }
        else {
            let roomId = Math.random().toString(36).substr(2, 5);

            _socketIOServer.emit('matchmaker-send-to-room', cookieId, realtimeToUse.url, roomId);
            winston.debug('Sent client with cookie (' + cookieId + ') to room: ' + roomId);
            waitingClient.presenceSocket.emit('matchmaker-send-to-room', waitingClient.cookie, realtimeToUse.url, roomId);
            winston.debug('Sent client with cookie (' + waitingClient.cookie + ') to room: ' + roomId);

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

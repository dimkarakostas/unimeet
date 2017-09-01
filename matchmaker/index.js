const program = require('commander'),
      axios = require('axios'),
      io = require('socket.io-client'),
      winston = require('winston'),
      serviceConfig = require('../config/services.json');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9872]', 9872)
    .parse(process.argv);

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true, 'label': 'matchmaker'});

const PORT = program.port;
const SERVICES = [
    {
        url: serviceConfig.presence.url,
        type: 'presence'
    },
    {
        url: serviceConfig.realtime.url,
        type: 'realtime'
    },
]

winston.info('Unimeet matchmaker service');
winston.info('Listening on port ' + PORT);

function sendToRoom(client1, client2) {
    let roomId = Math.random().toString(36).substr(2, 35);

    client1.presenceSocket.emit('matchmaker-send-to-room', client1.token, realtimeToUse.url, roomId, client2.token);
    winston.debug('Sent client with token (' + client1.token + ') to room: ' + roomId);
    client2.presenceSocket.emit('matchmaker-send-to-room', client2.token, realtimeToUse.url, roomId, client1.token);
    winston.debug('Sent client with token (' + client2.token + ') to room: ' + roomId);
}

let serviceSockets = [];
let presenceToUse = '';
let realtimeToUse = '';
let waitingClient = null;
let queue = [];
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
        var client = {'token': token, 'presenceSocket': _socketIOServer};
        axios.get(serviceConfig.backend.url + '/user_info', {
            params: {
                token: token
            }
        })
        .then(res => {
            client.gender = res.data.gender;
            axios.get(serviceConfig.backend.url + '/user_interests', {
                params: {
                    token: token
                }
            })
            .then(res => {
                client.interestedInGender = res.data.interestedInGender;
                for (var i=0; i < queue.length; i++) {
                    let candidate = queue[i];
                    if (
                        (client.interestedInGender === '0' || client.interestedInGender === candidate.gender) &&  // If the client is interested in the candidate...
                        (candidate.interestedInGender === '0' || candidate.interestedInGender === client.gender)  // and the candidate is interested in the client
                    ) {
                        queue.splice(i, 1);
                        sendToRoom(client, candidate);
                        return;
                    }
                }
                queue.push(client);
            })
            .catch(error => {
                winston.error(error);
            })
        })
        .catch(error => {
            winston.error(error);
        })
    });

    _socketIOServer.on('presence-client-disconnected', (token) => {
        for (var i=0; i < queue.length; i++) {
            if (queue[i].token === token) {
                queue.splice(i, 1);
            }
        }
        winston.debug('Client disconnected: ' + token);
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

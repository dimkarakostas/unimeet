const program = require('commander'),
      axios = require('axios'),
      serviceConfig = require('../config/services.json');

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

winston.info('Unimeet presence service');
winston.info('Listening on port ' + PORT);

const socketIOServer = io.listen(PORT);

var tokenClients = {};
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

    client.on('matchmaker-send-to-room', (token, realtimeUrl, roomId, partnerToken) => {
        // Verify if the message actually came from the matchmaker client
        if (client.id === matchmaker) {
            axios.get(serviceConfig.backend.url + '/user_info', {
                params: {
                    token: partnerToken
                }
            })
            .then(res => {
                var partnerInfo = {
                    gender: res.data.gender,
                    school: res.data.school,
                    university: res.data.university,
                    country: res.data.country
                }

                let frontendClient = tokenClients[token];
                socketIOServer.to(frontendClient).emit('server-join-room', realtimeUrl, roomId, partnerInfo);
                winston.debug('Sending client ' + frontendClient + ' to realtime (' + realtimeUrl + ') in room ' + roomId);
            })
            .catch(error => {
                winston.error(error);
            })

            var waitingIndex = waitingClients.indexOf(token);
            if (waitingIndex > -1) {
                waitingClients.splice(waitingIndex, 1);
            }
            winston.debug('Deleted client with token (' + token + ') from waiting queue.');
        }
    });

    client.on('matchmaker-update-queue', (token, queuePosition) => {
        let client = tokenClients[token];
        socketIOServer.to(client).emit('queue-position', queuePosition);
        winston.debug('Client with token (' + token + ') is now in position ' + queuePosition + '.');
    });

    // Frontend communication
    client.on('client-get-partner', (token) => {
        client._token = token;
        if (token in tokenClients) {
            client.emit('server-already-connected');
        }
        else {
            tokenClients[token] = client.id;
            winston.debug('Client ' + client.id + ' with token (' + client._token + ') wants partner.');
            if (matchmaker === null) {
                waitingClients.push(client._token);
            }
            else {
                socketIOServer.to(matchmaker).emit('presence-find-partner', client._token);
            }
        }
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
        var waitingIndex = waitingClients.indexOf(client._token);
        if (waitingIndex > -1) {
            waitingClients.splice(waitingIndex, 1);
        }
        delete tokenClients[client._token];
        if (matchmaker !== null) {
            socketIOServer.to(matchmaker).emit('presence-client-disconnected', client._token);
        }
    });
});

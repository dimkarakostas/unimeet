const program = require('commander');

program
    .version('1.0.0')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9870]', 9870)
    .parse(process.argv);


const io = require('socket.io'),
      winston = require('winston');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true});

const PORT = program.port;

winston.info('Unichat presence service');
winston.info('Listening on port ' + PORT);

const socket = io.listen(PORT);

var cookieClients = {};
var matchmaker = '';
socket.on('connection', (client) => {
    winston.debug('New connection from client ' + client.id);

    // Matchmaker communication
    client.on('register-matchmaker', () => {
        matchmaker = client.id;
        winston.debug('Matchmaker service connected with id ' + client.id);
    });

    client.on('matchmaker-send-to-room', (cookieId, roomId) => {
        let frontendClient = cookieClients[cookieId];
        socket.to(frontendClient).emit('server-join-room', roomId);
        winston.debug('Sending client ' + frontendClient + ' to room ' + roomId);
    });

    // Frontend communication
    client.on('client-get-partner', (cookieId) => {
        client._cookieId = cookieId;
        cookieClients[cookieId] = client.id;
        winston.debug('Client ' + client.id + ' with cookie (' + client._cookieId + ') wants partner.');
        socket.to(matchmaker).emit('presence-find-partner', client._cookieId);
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
    });
});

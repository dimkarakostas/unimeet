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

const ROOMID = 'room1';

socket.on('connection', (client) => {
    winston.debug('New connection from client ' + client.id);
    this.clientId = '';

    client.on('client-get-partner', (clientId) => {
        this.clientId = clientId;
        winston.debug('Client ' + client.id + ' is actually Unichat user ' + this.clientId + ' and wants partner.');
        client.emit('server-join-room', ROOMID);
        winston.debug('Sending client ' + client.id + ' to room ' + ROOMID);
    });

    client.on('disconnect', () => {
        winston.debug('Client ' + client.id + ' disconnected');
    });
});
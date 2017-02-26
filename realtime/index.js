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
    winston.debug('New connection from client ' + client.id);

    client.on('client-hello', (data) => {
        winston.debug('Client ' + client.id + ' sent client-hello.');
        client.emit('server-hello', client.id);
    });
});

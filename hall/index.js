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

winston.info('Unichat hall service');
winston.info('Listening on port ' + PORT);

const socket = io.listen(PORT);

socket.on('connection', (client) => {
    winston.debug('New connection from client ' + client.id);
});

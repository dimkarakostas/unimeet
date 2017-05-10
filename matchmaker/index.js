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
winston.add(winston.transports.Console, {'timestamp': true});

const PORT = program.port;
const SERVICES = config.services;

winston.info('Unichat matchmaker service');
winston.info('Listening on port ' + PORT);

let serviceSockets = [];
for (var i=0; i < SERVICES.length; i++) {
    let _url = SERVICES[i].url;
    let _type = SERVICES[i].type;

    let _socket = io.connect(_url, {'forceNew': true});

    _socket.on('connect', () => {
        winston.debug('Connected to ' + _type + ' service at ' + _url);
    });

    serviceSockets.push(_socket);
}

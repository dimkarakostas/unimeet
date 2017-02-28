const program = require('commander');

program
    .version('0.0.1')
    .option('-p, --port <port>', 'specify the websocket port to listen to [9872]', 9872)
    .parse(process.argv);


const io = require('socket.io'),
      winston = require('winston'),
      models = require('./models');

winston.level = 'debug';
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {'timestamp': true});

const PORT = program.port;

winston.info('Unichat registrar service');
winston.info('Connecting to database...');

models.sequelize.sync().then( () => {
    winston.info('Listening on port ' + PORT);
    const socket = io.listen(PORT);
});

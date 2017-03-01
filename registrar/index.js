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

const addUser = (user) => {
    models.User.create(user).then(() => {
        winston.debug('User ' + user.username + ' has been created.');
    }).catch((e) => {
        if (e.name == 'SequelizeValidationError') {
            if (e.message.startsWith("notNull Violation")) {
                winston.error(user.username + ': Please fill all necessary fields.');
            }
            else if (e.message.startsWith("Validation error: Validation isEmail failed")) {
                winston.error(user.username + ': Invalid email given.');
            }
            else if (e.message.startsWith("Password confirmation")) {
                winston.error(user.username + ': Passwords don\'t match');
            }
            else if (e.message.startsWith("Password should be at least 6 characters")) {
                winston.error(user.username + ': ' + e.message);
            }
            else {
                throw e;
            }
        }
        else if (e.name == 'SequelizeUniqueConstraintError') {
            winston.error(user.email + ': Email already exists.');
        }
        else {
            throw e;
        }
    });
};

models.sequelize.sync().then( () => {
    winston.info('Listening on port ' + PORT);
    const socket = io.listen(PORT);
});

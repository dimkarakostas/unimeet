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
    return models.User.create(user).then((user) => {
        winston.debug('User ' + user.email + ' has been created.');
        return user;
    }).catch((e) => {
        let errorMessage;
        if (e.name == 'SequelizeValidationError') {
            if (e.message.startsWith("notNull Violation")) {
                errorMessage = user.username + ': Please fill all necessary fields.';
            }
            else if (e.message.startsWith("Validation error: Validation isEmail failed")) {
                errorMessage = user.username + ': Invalid email given.';
            }
            else if (e.message.startsWith("Password confirmation")) {
                errorMessage = user.username + ': Passwords don\'t match';
            }
            else if (e.message.startsWith("Password should be at least 6 characters")) {
                errorMessage = user.username + ': ' + e.message;
            }
            else {
                throw e;
            }
        }
        else if (e.name == 'SequelizeUniqueConstraintError') {
            errorMessage = user.email + ': Email already exists.';
        }
        else {
            throw e;
        }
        throw new Error(errorMessage);
    });
};

models.sequelize.sync().then( () => {
    winston.info('Listening on port ' + PORT);
    const socket = io.listen(PORT);
    let userLine = [];
    socket.on('connection', (client) => {
        winston.debug('New connection from client ' + client.id);

        client.on('client-hello', () => {
            winston.debug('Client ' + client.id + ' sent client-hello.');
            client.emit('server-hello', client.id);
        });

        client.on('register', (data) => {
            winston.debug('Client ' + client.id + ' wants to register.');
            let email, sex, password, password_confirmation, UniversityId;

            try {
                ({email, sex, password, password_confirmation, UniversityId} = data);
            }
            catch (e) {
                winston.error('Got invalid register message (data: ' + data + ') from client ' + client.id);
                return;
            }

            let message;
            addUser(data)
            .then((user) => {
                message = 'User with mail ' + user.email + ' was registered.';
            })
            .catch((e) => {
                message = e.message;
            })
            .finally(() => {
                winston.debug(message);
                client.emit('server-register', {message: message});
            });
        });

        client.on('start-chat', (data) => {
            let email;
            try {
                ({email} = data);
            }
            catch (e) {
                winston.error('Got invalid register message (data: ' + data + ') from client ' + client.id);
                return;
            }
            winston.debug('Client ' + email + ' wishes to start chatting.');

            if (userLine.length > 0) {
                let partnerEmail, partnerClientId;
                ({partnerEmail, partnerClientId} = userLine.pop());
                let roomId = email + partnerEmail;

                client.emit('server-start-chat', {partnerEmail: partnerEmail, roomId: roomId});
                socket.in(partnerClientId).emit('server-start-chat', {partnerEmail: email, roomId: roomId});
            }
            else {
                let clientId = client.id;
                userLine.push({partnerEmail: email, partnerClientId: clientId});
            }
        });
    });
});

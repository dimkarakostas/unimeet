const io = require('socket.io-client'),
      config = require('./config.js');

const UnichatRegistrarClient = {
    _registrarUrl: null,
    _socket: null,
    init(registrarUrl) {
        this._registrarUrl = registrarUrl;
        this._socket = io.connect(this._registrarUrl, {'forceNew': true});
        this._socket.on('connect', () => {
            console.log('Connected');
            this._socket.emit('client-hello');
        });
        this._socket.on('disconnect', () => {
            console.log('Registrar disconnected');
        });
        this._socket.on('server-hello', () => {
            let _form = {
                email: '2jim@jim.com',
                sex: 1,
                password: 'password',
                password_confirmation: 'password',
                UniversityId: 1
            };
            this.register(_form);
            this.startChatting('2jim@jim.com');
        });
        this._socket.on('server-register', (data) => {
            console.log('Registration complete: ' + data.message);
        });
        this._socket.on('server-start-chat', (data) => {
            console.log('Starting chat with ' + data.partnerEmail + ' in room ' + data.roomId);
        });
    },
    register(form) {
        console.log('Registering...');
        this._socket.emit('register', form);
    },
    startChatting(email) {
        console.log('Wishing to start chatting...');
        this._socket.emit('start-chat', {email: email});
    },
};

UnichatRegistrarClient.init(config.REGISTRAR_URL);

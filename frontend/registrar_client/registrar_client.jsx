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
        });
        this._socket.on('server-register', (data) => {
            console.log('Registration complete: ' + data.message);
        });
    },
    register(form) {
        console.log('Registering...');
        this._socket.emit('register', form);
    },
    },
};

UnichatRegistrarClient.init(config.REGISTRAR_URL);

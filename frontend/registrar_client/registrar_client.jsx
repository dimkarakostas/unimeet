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
    },
};

UnichatRegistrarClient.init(config.REGISTRAR_URL);

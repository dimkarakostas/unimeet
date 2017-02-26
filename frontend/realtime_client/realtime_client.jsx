const io = require('socket.io-client'),
      config = require('./config.js');

const UnichatClient = {
    _realtimeUrl: null,
    _socket: null,
    _clientId: null,
    _roomId: 'room1',
    _canSendMessages: false,
    init(realtimeUrl) {
        this._realtimeUrl = realtimeUrl;
        this._socket = io.connect(this._realtimeUrl);
        this._socket.on('connect', () => {
            console.log('Connected');
            this._socket.emit('client-hello');
        });
        this._socket.on('server-hello', (client_id) => {
            this._clientId = client_id;
            console.log('Active, my id is ' + client_id + ', joining room ' + this._roomId);
            this._socket.emit('join-room', {
                roomId: this._roomId
            });
            this._canSendMessages = true;
        });
    }
};

UnichatClient.init(config.REALTIME_URL);

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
        this._socket = io.connect(this._realtimeUrl, {'forceNew': true});
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
            this.send_message();
        });
        this._socket.on('message', (message) => {
            console.log('Received message:');
            console.log('\t' + message);
        });
        this._socket.on('disconnect', () => {
            console.log('Realtime disconnected');
            this._canSendMessages = false;
        });
    },
    send_message() {
        console.log('Can send messages? ' + this._canSendMessages);
        let message = 'Hello room, I am ' + this._clientId;
        setTimeout(
            () => {
                if (this._canSendMessages) {
                    console.log('Sending message to room: ' + message);
                    this._socket.emit('send', {
                        roomId: this._roomId,
                        message: message
                    });
                };
                this.send_message();
            },
            2000
        );
    }
};

UnichatClient.init(config.REALTIME_URL);

import io from 'socket.io-client';

function realtimeConnector(realtimeUrl, roomId, handleNewMessageCallback, handleNextCallback, disableChatCallback) {
    this._cookieId = 'cookie';
    this._chatting = false;
    this._socket = io.connect(realtimeUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-join-room', roomId, this._cookieId);
    });
    this._socket.on('server-start-chatting', () => {
        if (!this._chatting) {
            disableChatCallback(false);
            this._chatting = true;
        }
    });
    this._socket.on('server-message', (message, from) => {
        handleNewMessageCallback(message, from);
    });
    this._socket.on('server-next', () => {
        handleNextCallback();
    });
    this._socket.on('disconnect', () => {
        disableChatCallback(true);
        this._chatting = false;
    });
    this.broadcastMessage = function(message) {
        this._socket.emit('client-message', message);
    };
    this.broadcastNext = function() {
        this._socket.emit('client-next');
        disableChatCallback(true);
        this._chatting = false;
    };
    this.disconnect = function() {
        this._socket.disconnect();
    }
    this.reconnect = function() {
        this._socket.connect();
    }
};

module.exports = realtimeConnector;

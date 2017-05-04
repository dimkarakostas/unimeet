import io from 'socket.io-client';

function connector(realtimeUrl, roomId, handleNewMessageCallback, disableChatCallback) {
    this._socket = io.connect(realtimeUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-join-room', roomId);
    });
    this._socket.on('server-join-room', (client_id) => {
        disableChatCallback(false);
    });
    this._socket.on('server-message', (message, from) => {
        handleNewMessageCallback(message, from);
    });
    this._socket.on('server-next', () => {
        disableChatCallback(true);
    });
    this._socket.on('disconnect', () => {
        disableChatCallback(true);
    });
    this.broadcastMessage = function(message) {
        this._socket.emit('client-message', message);
    };
    this.broadcastNext = function() {
        this._socket.emit('client-next');
        disableChatCallback(true);
    };
};

module.exports = connector;

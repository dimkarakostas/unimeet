import io from 'socket.io-client';

function realtimeConnector(realtimeUrl, roomId, handleNewMessageCallback, handleNextCallback, disableChatCallback) {
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
        handleNextCallback();
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

module.exports = realtimeConnector;

import io from 'socket.io-client';

function connector(realtimeUrl, roomId, handleNewMessageCallback, disableChatCallback) {
    this._roomId = roomId;
    this._socket = io.connect(realtimeUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-join-room', {
            roomId: roomId
        });
    });
    this._socket.on('server-join-room', (client_id) => {
        disableChatCallback(false);
    });
    this._socket.on('server-message', (message, from) => {
        handleNewMessageCallback(message, from);
    });
    this._socket.on('disconnect', () => {
        disableChatCallback(true);
    });
    this.broadcastMessage = function(message) {
        this._socket.emit('client-message', {
            roomId: this._roomId,
            message: message
        });
    };
};

module.exports = connector;
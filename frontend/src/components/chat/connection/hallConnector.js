import io from 'socket.io-client';

function hallConnector(hallUrl, joinRoomCallback) {
    this._socket = io.connect(hallUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-get-partner');
    });
    this._socket.on('server-join-room', (roomId) => {
        joinRoomCallback(roomId);
    });
    this.reconnect = function() {
        this._socket.connect();
    }
};

module.exports = hallConnector;

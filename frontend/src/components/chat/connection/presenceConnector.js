import io from 'socket.io-client';

function presenceConnector(presenceUrl, joinRoomCallback) {
    this._cookieId = 'cookie';
    this._socket = io.connect(presenceUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-get-partner', this._cookieId);
    });
    this._socket.on('server-join-room', (roomId) => {
        joinRoomCallback(roomId);
    });
    this.disconnect = function() {
        this._socket.disconnect();
    }
    this.reconnect = function() {
        this._socket.connect();
    }
};

module.exports = presenceConnector;

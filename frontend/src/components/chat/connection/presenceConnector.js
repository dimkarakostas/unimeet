import io from 'socket.io-client';

function presenceConnector(cookie, presenceUrl, joinRoomCallback) {
    this._socket = io.connect(presenceUrl, {'forceNew': true});
    this._socket.on('connect', () => {
        this._socket.emit('client-get-partner', cookie);
    });
    this._socket.on('server-join-room', (realtimeUrl, roomId) => {
        joinRoomCallback(realtimeUrl, roomId);
    });
    this.disconnect = function() {
        this._socket.disconnect();
    }
    this.reconnect = function() {
        this._socket.connect();
    }
};

module.exports = presenceConnector;
